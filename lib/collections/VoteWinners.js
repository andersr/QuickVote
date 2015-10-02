VoteWinners = new Mongo.Collection('voteWinners');

Meteor.methods({

  createVoteWinners:function(voteId){

    check(Meteor.userId(), String);
    check(voteId, String);

    VoteWinners.insert({
      voteId: voteId,
      winningCount: 0,
      winningChoices: []
    });

  },

  removeVoteWinners: function(voteId){

    check(Meteor.userId(), String);
    check(voteId, String);

    var voteWinner = VoteWinners.findOne({voteId: voteId});

    VoteWinners.remove({_id: voteWinner._id});

  }

});