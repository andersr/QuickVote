QV = {
    updateVoteWinners: function(voteId){

    var vote            = Votes.findOne({_id: voteId});
    var winningChoices  = [];
    var winningCount    = VoteChoices.findOne({voteId: vote._id}, {count: 1, sort: { count: -1 }}).count;
    var voteChoices     = VoteChoices.find({ voteId: vote._id });
    // console.log("winningCount: " + winningCount );

    if (winningCount > 0) {

      voteChoices.forEach(function (voteChoice) {
        if (voteChoice.count === winningCount) {
          winningChoices.push(voteChoice._id);
        };
      });
      // console.log("top vote choices: " + winningVoteChoices );
    };

    var voteAttributes = {
      voteId:          vote._id,
      winningChoices:  winningChoices,
      winningCount:    winningCount
    };

    Meteor.call('updateVoteWinners',voteAttributes, function (error, result) {
      if (error){
        console.log(error.reason);
      };
    });
 
  }

};
