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

    // else {
    //   // console.log("all vote choices are 0: " + winningVoteChoices);

    //   // Meteor.call('clearVoteWinners',voteId, function (error, result) {
    //   //   if (error){
    //   //     console.log(error.reason);
    //   //   };
    //   // });
    //   winningCount = 0;

    // };

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

  // resetWinners: function(voteId){

  //   //remove all voteChoices from winningChoices

  //   var vote = Votes.findOne(
  //     {_id: voteId});

  //   var winningVoteChoiceCount = vote.winningChoices.length;

  //   var voteAttributes = {
  //     voteId: voteId,
  //     winningCount: winningVoteChoiceCount
  //   }
    
  //   if (winningVoteChoiceCount === 0) {

  //     Meteor.call('resetVoteWinningCount',voteAttributes, function (error, result) {
  //       if (error){
  //         console.log(error.reason);
  //       };
  //     });

  //   };
   
  // }

};


  // updateVoteWinners: function(voteChoiceId){

  //   var voteChoice = VoteChoices.findOne({ _id: voteChoiceId });
  //   var vote = Votes.findOne({ _id: voteChoice.voteId });

  //   var voteAttributes = {
  //     voteId: vote._id,
  //     voteChoiceId: voteChoice._id
  //   };

  //   Meteor.call('updateVoteWinners', voteAttributes, function (error, result) {
  //     if (error){
  //       console.log(error.reason);
  //     } else {
  //       //get the return value and handle it from here
  //     }
  //   });
  // },
