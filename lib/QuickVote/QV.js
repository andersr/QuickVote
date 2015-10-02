QV = {

  updateWinners: function(voteChoiceId){

    var voteChoice = VoteChoices.findOne({ _id: voteChoiceId });
    var currentVote = Votes.findOne({ _id: voteChoice.voteId });

    var voteAttributes = {
      voteId: currentVote._id,
      voteChoiceId: voteChoice._id
    };

    Meteor.call('updateWinners', voteAttributes, function (error, result) {
      if (error){
        console.log(error.reason);
      } 
    });
  }

};

