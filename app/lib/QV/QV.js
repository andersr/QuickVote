QV = {

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
   
  },
  getWinningVoteChoices: function(voteId){
    //1. get matching vote and voteChoices
    var winningChoicesCount = [];
    var topVoteChoiceCount = 0;
    var vote = Votes.findOne({_id: voteId});
    var voteChoicesArray = VoteChoices.find({voteId: vote._id}, {sort: { count: -1 }}).fetch();
    // console.log("voteChoicesArray: " + voteChoicesArray );
    //foreach item in voteChoices

    // 1. find highest voteChoiceCount
    voteChoices.forEach(function (voteChoice) {
      if (voteChoice.count > topVoteChoiceCount) {
        topVoteChoiceCount = voteChoice.count;
      };
    });

    if (topVoteChoiceCount > 0) {
      // 2. add all voteChoices with this count to winners array
      voteChoices.forEach(function (voteChoice) {
        if (voteChoice.count === topVoteChoiceCount) {
          topVoteChoiceCount = voteChoice.count;
        };
      });

      //update vote winningCount and winningChoices

    } else {
      // reset winningCount and winningChoices
    };
 
  }
};

