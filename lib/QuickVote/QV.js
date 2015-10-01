QV = {

  updateWinners: function(voteChoiceId){

    var voteChoice = VoteChoices.findOne({ _id: voteChoiceId });
    var currentVote = Votes.findOne({ _id: voteChoice.voteId });

    // console.log(voteChoice.count);

    if (currentVote.winningCount > 0) {

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
      // TODO: check if winningCount came down:
      // separate check: if the vote count is less than the winning count
      // are there any winningVotes?
      // if none
      // what is next highest voteCount?
      // if none - hasWinner false

    } else {
      Votes.update(currentVote._id, {
        $set: { 
          hasWinner:false
        }
      }); 
    };

  }

};

