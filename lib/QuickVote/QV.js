QV = {

  updateWinners: function(voteChoiceId){

    var voteChoice = VoteChoices.findOne({ _id: voteChoiceId });
    var currentVote = Votes.findOne({ _id: voteChoice.voteId });

    console.log(voteChoice.count);


    if (voteChoice.count === currentVote.winningCount) {
      Votes.update(currentVote._id, {
        $push: { 
          winningChoices: voteChoice._id
        }
      });
    } else if (voteChoice.count > currentVote.winningCount) {
       Votes.update(currentVote._id, {
        $set: { 
          winningChoices: [voteChoice._id],
          winningCount: voteChoice.count,
          hasWinner:true
        }
      });       
    };

  }

};

