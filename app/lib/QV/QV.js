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
      } else {
        //get the return value and handle it from here
      }
    });
  },
  resetIfNoWinners: function(voteId){

    var vote = Votes.findOne(
      {_id: voteId});

    var winningVoteChoiceCount = vote.winningChoices.length;

    var voteAttributes = {
      voteId: voteId,
      winningCount: winningVoteChoiceCount
    }
    
    if (winningVoteChoiceCount === 0) {

      Meteor.call('resetVoteWinningCount',voteAttributes, function (error, result) {
        if (error){
          console.log(error.reason);
        };
      });

    };

    console.log("winningVoteChoiceCount: " + winningVoteChoiceCount);
    //if winningChoices array is empty
    // set voteChoice count to 0
    // return false
   
  }
};


    // ){
    //         Meteor.call('resetVoteWinningCount', 0, function (error, result) {
    //            if (error){
    //         console.log(error.reason);
    //         } 

    //         });

    //        };

      // Meteor.call('removeWinningChoice',voteAttributes, function (error, result) {
      //   if (error){
      //     console.log(error.reason);
      //   } else {
      //     QV.resetIfNoWinners(vote._id);
      //   };
      // });

    
      //check to see if any items remaining in array, if none, set winningCount to 0 
      // call this after winner has been removed, ie in result
      // QV.hasWinners(vote._id);


      // var winningChoiceCount = Votes.aggregate(
      //   vote._id, { $size: winningChoices});

      // console.log("winningChoiceCount: " + winningChoiceCount);
