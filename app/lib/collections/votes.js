Votes = new Mongo.Collection('votes');

Meteor.methods({

  createVote:function(voteAttributes){

    check(Meteor.userId(), String);
    check(voteAttributes, {
      title: String
    });

    var ownerName = Meteor.users.findOne({_id: Meteor.userId() }).profile.name || "";
    var ownerPublicName;

    if (ownerName != "") {
      ownerPublicName = AppLib.txtHelpers.firstWordFirstCharOfSecondWord(ownerName);
    } else {
       ownerPublicName = "";
    };

    var voteAttributes = _.extend(voteAttributes, {
      owner: Meteor.userId(),
      ownerPublicName: ownerPublicName,
      createdAt: new Date(),
      updatedAt: new Date(),
      voteStarted: false,
      voteEnded: false,
      winningCount: 0,
      winningChoices: []
    });

    var voteId = Votes.insert(voteAttributes);

    // Meteor.call('createVoteWinners', voteId, function (error, result) {
    //   if (error){
    //     console.log(error.reason);
    //   }
    // });

    return {
      voteId:voteId
    }

  },
  startVote: function(voteAttributes){
    check(Meteor.userId(), String);
    check(voteAttributes, {
      voteId: String
    });

    var vote = Votes.findOne({_id: voteAttributes.voteId });

    if(vote.owner === Meteor.userId()){

      Votes.upsert(voteAttributes.voteId, {
        $set: {
          voteStarted: true
        }
      });

    }
  },
  endVote: function(voteAttributes){
    check(Meteor.userId(), String);
    check(voteAttributes, {
      voteId: String
    });

    var vote = Votes.findOne({_id: voteAttributes.voteId });

    if(vote.owner === Meteor.userId()){

      Votes.upsert(voteAttributes.voteId, {
        $set: {
          voteEnded: true
        }
      });

    }
  },
  // openCloseVote: function(voteAttributes){
  //   check(Meteor.userId(), String);
  //   check(voteAttributes, {
  //     voteId: String,
  //     votingEnabled: Boolean
  //   });

  //   var vote = Votes.findOne({_id: voteAttributes.voteId });

  //   if(vote.owner === Meteor.userId()){

  //     Votes.upsert(voteAttributes.voteId, {
  //       $set: {
  //         votingEnabled: voteAttributes.votingEnabled,
  //         votingInitiated: true
  //       }
  //     });

  //   }
  // },

  // MAKE SURE THIS WORKS NOW
  updateVoteWinners: function(voteAttributes){
    check(Meteor.userId(), String);
    check(voteAttributes, {
      voteId:          String,
      winningChoices:  [String],
      winningCount:    Number
    });

    var vote = Votes.findOne({_id: voteAttributes.voteId });

    Votes.update(vote._id, {
      $set: {
        winningChoices: voteAttributes.winningChoices,
        winningCount: voteAttributes.winningCount
       }
    });

  },

  deleteVote:function(voteId){

    check(Meteor.userId(), String);
    check(voteId, String);

    //TODO: move to deleteDependencies function

    VoteChoices.find({voteId: voteId}).forEach(function (doc) {
      Meteor.call('removeVoteChoice', doc._id, function(error, result){
        if (error){
          console.log(error.reason);
        }
      });
    });

    UserVotes.find({voteId: voteId}).forEach(function (doc) {
      Meteor.call('removeUserVote', doc._id, function(error, result){
        if (error){
          console.log(error.reason);
        }
      });
    });

    Meteor.call('removeVoteWinners', voteId, function(error, result){
      if (error){
        console.log(error.reason);
      }
    });

    Votes.remove({_id: voteId});

  }

});
