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

    // if (voteChoice.count === vote.winningCount){ 
    //   // add to voteWinners if vote counts are the same
    //   Votes.update(vote._id, { $push: { winningChoices: voteChoice._id } });

    // } else if (voteChoice.count > vote.winningCount) {
    //   // replace voteWinners if voteChoice count is higher
    

      //TODO: increase winningCount

    // } else if (voteChoice.count < vote.winningCount){
    //   // remove choice from voteWinners if lower than winningCount
    //   Votes.update(vote._id, { $pull: { winningChoices: voteChoice._id } });

    //   // TODO: find next highest vote choices and add to winningChoices
    //   // decrease winningCount to next highest count
    //   // if no vote choices with a count value are found, set winningCount to 0
      
    // };
  },

  // clearVoteWinners: function(voteId){

  //   check(Meteor.userId(), String);
  //   check(voteId, String);

  //   Votes.update(voteId, {
  //     $set: { 
  //       winningChoices:[],
  //       winningCount: 0
  //     }
  //   }); 

  // },

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