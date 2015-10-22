QV = {

  userVoteUpVote: function(userVoteAttributes){

    Meteor.call('userVoteUpVote',userVoteAttributes, function (error, result) {
      if (error){
        console.log(error.reason);
      }; 
    });

  },

  updateVoteWinners: function(voteId){

  var vote                   = Votes.findOne({_id: voteId});
  var winningChoices         = [];
  var voteChoicesTopCount    = VoteChoices.findOne({voteId: vote._id}, {count: 1, sort: { count: -1 }}).count;
  var voteChoices            = VoteChoices.find({ voteId: vote._id });
  console.log("voteChoicesTopCount: " + voteChoicesTopCount );

  if (voteChoicesTopCount > 0) {

    voteChoices.forEach(function (voteChoice) {
      if (voteChoice.count === voteChoicesTopCount) {
        winningChoices.push(voteChoice._id);
      };
    });
    // console.log("top vote choices: " + winningVoteChoices );
  };

  var voteAttributes = {
    voteId:          vote._id,
    winningChoices:  winningChoices,
    winningCount:    voteChoicesTopCount
  };

  Meteor.call('updateVoteWinners',voteAttributes, function (error, result) {
    if (error){
      console.log(error.reason);
    };
  });

}

};
