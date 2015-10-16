
Template.voteDetail.helpers({
  
  voteChoices:function(){
    return VoteChoices.find({voteId: Router.current().params._id }, {sort: { updatedAt: -1 }});
  },
  votingInitiated: function(){
    var vote = Votes.findOne({_id: Router.current().params._id });
    return vote.votingInitiated;
  },
  displayWinners: function(){

    var vote = Votes.findOne({_id: Router.current().params._id }, {winningChoices: 1, winningCount: 1 });
    
    // console.log("winning choices: " + vote.winningChoices);

    var voteWinnerIds = vote.winningChoices.toString().split(',');

    console.log("voteWinnerIds: " + voteWinnerIds);

    var voteWinnerTitles = _.map(voteWinnerIds, function(voteWinnerId){
      return VoteChoices.findOne({_id: voteWinnerId }).title;
    });

    console.log("winning titles: " + voteWinnerTitles);

    return "Winning titles are: " + voteWinnerTitles;

    // Votes.findOne( { field: { $size: 1 } } );

      // if (vote.winningChoices.length() > 0) {

      //   var winningVoteChoiceTitles = _.map(vote.winningChoices,
      //     function(choiceId){
      //       return VoteChoices.findOne({_id: choiceId }).title;
      //     }
      //   );

      // };

      // return "Winners: " + voteWinnerIds;

    //if winningChoice.length() === 1
    // return "winningChoice.title is the winner!"

    //else
    // return "It's a #{winningChoices.length()}-way tie: forEach winningChoice, display winningChoice.title";

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
