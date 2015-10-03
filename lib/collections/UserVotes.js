UserVotes = new Mongo.Collection('userVotes');

// from http://joshowens.me/meteor-security-101/

UserVotes.allow({  
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
UserVotes.deny({  
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});

Meteor.methods({

  newUserVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String,
      voteId: String
    });

    var userId = Meteor.userId();

    UserVotes.insert({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      voteId: userVoteAttributes.voteId,
      userId: userId,
      upVote: true
    });

    Meteor.call('increaseVoteChoiceCount', userVoteAttributes.voteChoiceId,
      function (error, result) {
        if (error){
        console.log(error.reason);
        }
      }
    );

  },

  upDownVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteId: String,
      voteChoiceId: String,
      upVote: Boolean
    });

    var userId = Meteor.userId();    
    var voteChoice = VoteChoices.findOne({ _id: userVoteAttributes.voteChoiceId });

    var userVote = UserVotes.findOne({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      userId: userId
    });

    UserVotes.upsert(userVote._id, {
      $set: { 
        upVote: userVoteAttributes.upVote
      }
    });

    //TODO: this needs to be moved ot VoteChoices > count

    if (userVoteAttributes.upVote) {
      updateVoteCount = 1;
    } else {
      updateVoteCount = -1;
    };

    VoteChoices.update(voteChoice._id, {
      $inc: { 
        count: updateVoteCount
      }
    });
  },

  toggleUpDownVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String,
      upVote: Boolean
    })

    var userId = Meteor.userId();
    var updateVoteCount;
    var voteChoice = VoteChoices.findOne({ _id: userVoteAttributes.voteChoiceId });
    var userVote = UserVotes.findOne({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      voterId: userId
    });

    UserVotes.upsert(userVote._id, {
      $set: { 
        upVote: userVoteAttributes.upVote
      }
    });

    //TODO: this needs to be moved ot VoteChoices > count

    if (userVoteAttributes.upVote) {
      updateVoteCount = 1;
    } else {
      updateVoteCount = -1;
    };

    VoteChoices.update(voteChoice._id, {
      $inc: { 
        count: updateVoteCount
      }
    });
  },
  removeUserVote:function(userVoteId){

      check(Meteor.userId(), String);
      check(userVoteId, String);

      UserVotes.remove(userVoteId);

  }
  // removeRelatedUserVotes:function(voteId){

  //     // check(Meteor.userId(), String);
  //     check(voteId, String);

  //     UserVotes.remove({voteId: voteId}, { multi: true });

  // }, 


});