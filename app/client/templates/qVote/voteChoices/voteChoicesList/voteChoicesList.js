Template.voteChoicesList.onCreated(function(){
  var
  templateInstance                  = this;
  templateInstance.showVoteResults  = new ReactiveVar();
  templateInstance.voteStarted  = new ReactiveVar(false);
  templateInstance.voteEnded  = new ReactiveVar(false);


  templateInstance.autorun(function(){

    var voteId = Router.current().params._id;
    var votesSubscription = templateInstance.subscribe('voteDetails', voteId);
    var votesChoicesSubscription = templateInstance.subscribe('voteChoices', voteId);

    if (votesSubscription.ready() && votesChoicesSubscription.ready()) {

      var vote = Votes.findOne({_id: voteId});
      templateInstance.voteStarted.set(vote.voteStarted);
      templateInstance.voteEnded.set(vote.voteEnded);

      //show add vote choice true if vote has not started or this vote has no vote choices
      if (!vote.voteStarted || VoteChoices.find({voteId: voteId }).count() === 0) {
         Session.set("addVoteChoice", true);
      };

      //show vote results if vote has eneded
      templateInstance.showVoteResults.set(vote.voteEnded);
    };
  });

});

Template.voteChoicesList.helpers({

  voteChoices:function(){

    if (Template.instance().showVoteResults.get()) {
      return VoteChoices.find({voteId: Router.current().params._id }, {sort: {  count: -1, title: 1, updatedAt: 1 }});
    } else {
      return VoteChoices.find({voteId: Router.current().params._id }, {sort: { updatedAt: -1 }});
    };

  },
  showVoteChoiceForm: function(){
    return Session.get("addVoteChoice");
  },
  showVoteResults: function(){
    return Template.instance().showVoteResults.get();
  },
  voteInProgress: function(){

    return Template.instance().voteStarted.get() && !Template.instance().voteEnded.get();
  }
  // ,
  // displayWinners: function(){

  //   var vote = Votes.findOne({_id: Router.current().params._id }, {winningChoices: 1, winningCount: 1 });
  //   var numberOfWinners = vote.winningChoices.length;
  //   var winningChoiceTitles = _.map(vote.winningChoices, function(winningChoice){
  //     return VoteChoices.findOne({_id: winningChoice }, {title: 1}).title;
  //   });

  //   if (numberOfWinners === 0) {
  //     return "No winners yet :-/";
  //   } else if (numberOfWinners === 1){
  //     return winningChoiceTitles[0] + " got the most votes!";
  //   } else if (numberOfWinners === 2){
  //     return "It's a tie between '" + winningChoiceTitles[0] + "' and '" + winningChoiceTitles[1] + "'!";

  //   } else if (numberOfWinners > 2){
  //      return "Three or more winners";

  //   } else {
  //      return "";  //something went wrong
  //   };

  // }

});

Template.voteChoicesList.events({

  "submit .vote-title-form": function(event,template){
    event.preventDefault();
    var voteTitle = event.target.voteTitle.value;
    var voteAttributes = {
      title: voteTitle
    };

    Meteor.call('createVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } else {
         template.find("form").reset();
      }
    });
  }

});
