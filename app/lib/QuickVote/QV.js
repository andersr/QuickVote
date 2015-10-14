QV = {

  updateVoteWinners: function(voteChoiceId){

    var voteChoice = VoteChoices.findOne({ _id: voteChoiceId });
    var vote = Votes.findOne({ _id: voteChoice.voteId });

    var voteAttributes = {
      voteId: vote._id,
      voteChoiceId: voteChoice._id
    };

    Meteor.call('updateVoteWinners', voteAttributes, function (error, result) {
      if (error){
        console.log(error.reason);
      } 
    });
  }
};

