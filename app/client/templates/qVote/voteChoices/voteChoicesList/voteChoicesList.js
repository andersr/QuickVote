Template.voteChoicesList.onCreated(function(){
  var
  templateInstance                  = this;
  templateInstance.showVoteResults  = new ReactiveVar();
   
  templateInstance.autorun(function(){

    var votesSubscription = templateInstance.subscribe('votes');

    if (votesSubscription.ready()) {
      var vote = Votes.findOne({_id: Router.current().params._id});
      templateInstance.showVoteResults.set(!vote.votingEnabled && vote.votingInitiated);      
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
  displayWinners: function(){

    var vote = Votes.findOne({_id: Router.current().params._id }, {winningChoices: 1, winningCount: 1 });
    var numberOfWinners = vote.winningChoices.length;
    var winningChoiceTitles = _.map(vote.winningChoices, function(winningChoice){
      return VoteChoices.findOne({_id: winningChoice }, {title: 1}).title;
    });

    if (numberOfWinners === 0) {
      return "No winners yet :-/";
    } else if (numberOfWinners === 1){
      return winningChoiceTitles[0] + " got the most votes!";
    } else if (numberOfWinners === 2){
      return "It's a tie between '" + winningChoiceTitles[0] + "' and '" + winningChoiceTitles[1] + "'!";

    } else if (numberOfWinners > 2){
       return "Three or more winners";
      
    } else {
       return "";  //something went wrong
    };

  }

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
