
Template.voteDetail.helpers({
  
  voteChoices:function(){
    return VoteChoices.find({voteId: Router.current().params._id }, {sort: { updatedAt: -1 }});
  },
  hasWinner: function(){
    var vote = Votes.findOne({_id: Router.current().params._id });
    return vote.winningCount > 0;
  },
  displayWinners: function(){
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
