Votes = new Mongo.Collection('votes');

// from http://joshowens.me/meteor-security-101/

Votes.allow({  
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  }
});
// deny anyone that tries to update the document userId:

Votes.deny({  
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});


Meteor.methods({

  createVote:function(voteAttributes){

    check(Meteor.userId(), String);
    check(voteAttributes, {
      title: String
    });

    var voteAttributes = _.extend(voteAttributes, {
      owner: Meteor.userId(),
      updatedAt: new Date(),
      votingEnabled: false,
      winningCount: 0,
      winningChoices: []
    });

    var voteId = Votes.insert(voteAttributes);

    Meteor.call('createVoteWinners', voteId, function (error, result) {
      if (error){
        console.log(error.reason);
      }
    });

    return {
      voteId:voteId
    }

  },

  openCloseVote: function(voteAttributes){
    check(Meteor.userId(), String);
    check(voteAttributes, {
      voteId: String,
      votingEnabled: Boolean
    });
 
    var vote = Votes.findOne({_id: voteAttributes.voteId });

    if(vote.owner === Meteor.userId()){

      Votes.upsert(voteAttributes.voteId, {
        $set: { 
          votingEnabled: voteAttributes.votingEnabled
        }
      });

    }
  },
  
  updateWinners: function(voteAttributes){
    check(Meteor.userId(), String);
    check(voteAttributes, {
      voteId: String,
      voteChoiceId: String
    });
 
    var vote = Votes.findOne({_id: voteAttributes.voteId });
    var voteChoice = VoteChoices.findOne({_id: voteAttributes.voteChoiceId });

    if (voteChoice.count === vote.winningCount){
      Votes.update(vote._id, {
        $push: { 
          winningChoices: voteChoice._id
        }
      });
    } else if (voteChoice.count > currentVote.winningCount) {
      Votes.update(currentVote._id, {
        $set: { 
          winningChoices: [voteChoice._id],
          winningCount: voteChoice.count
        }
      });       
    } else if(vote.winningCount === 0){
      Votes.update(currentVote._id, {
        $set: { 
          winningChoices: []
        }
      }); 
    };
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