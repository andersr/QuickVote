Template.voteDetail.onCreated(function(){
  var
  templateInstance                  = this;
  templateInstance.sortByVoteCount  = new ReactiveVar(false);
   
  templateInstance.autorun(function(){

    var votesSubscription = templateInstance.subscribe('votes');

    if (votesSubscription.ready()) {
      var vote = Votes.findOne({_id: Router.current().params._id});
      templateInstance.sortByVoteCount.set(!vote.votingEnabled && vote.votingInitiated);      
    };
  });

});


Template.voteDetail.helpers({
  
  voteChoices:function(){
    console.log("sort by vote count: " + Template.instance().sortByVoteCount.get());

    if (Template.instance().sortByVoteCount.get()) {
      return VoteChoices.find({voteId: Router.current().params._id }, {sort: {  count: -1, title: 1, updatedAt: 1 }});
    } else {
      return VoteChoices.find({voteId: Router.current().params._id }, {sort: { updatedAt: -1 }});
    };
   
  },
  votingInitiated: function(){
    var vote = Votes.findOne({_id: Router.current().params._id });
    // console.log("voting initiated: " + vote.votingInitiated);
    return vote.votingInitiated;
  },
  displayWinners: function(){

    var vote = Votes.findOne({_id: Router.current().params._id }, {winningChoices: 1, winningCount: 1 });
    var numberOfWinners = vote.winningChoices.length;
    var winningChoiceTitles = _.map(vote.winningChoices, function(winningChoice){
      return VoteChoices.findOne({_id: winningChoice }, {title: 1}).title;
    });

        // winningChoices = _.pluck(vote.fetch(), 'winningChoices');
    
    // console.log("winning choices: " + vote.winningChoices[0]);

    // var winningChoiceIds = vote.winningChoices.toString().split(',');

    // console.log("voteWinnerIds: " + winningChoiceIds);

    // console.log("winning titles: " + winningChoiceTitles);

    // return "Winning titles are: " + winningChoiceTitles;


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

      // var winningVoteChoiceTitles = _.map(vote.winningChoices,
      //     function(choiceId){
      //       return VoteChoices.findOne({_id: choiceId }).title;
      //     }
      //   );

      // return "Winners: " + voteWinnerIds;

    //if winningChoice.length() === 1
    // return "winningChoice.title is the winner!"

    //else
    // return "It's a #{winningChoices.length()}-way tie: forEach winningChoice, display winningChoice.title";


    // switch(voteWinners.length) {
    //   case 0:
    //     return "No winners yet :-/";
 
    //   case 1:
    //     return "We have one winner!";
 
    //   case 2:
    //     return "We have one winner!";
 
    //   case > 2:
    //     return "We have one winner!";

    //   case 1:
    //     return "We have one winner!";

    // default:
    

  }

});

Template.voteDetail.events({

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
