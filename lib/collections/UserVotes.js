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
      voteId: String,
      upVote: Boolean
    });

    var userId = Meteor.userId();

    var userVote = UserVotes.insert({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      voteId: userVoteAttributes.voteId,
      voterId: userId,
      upVote: true
    });

    var voteChoice = VoteChoices.findOne({
        _id: userVoteAttributes.voteChoiceId 
    });

    VoteChoices.upsert(voteChoice._id, {
      $inc: { 
        count: 1
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

    if (userVoteAttributes.upVote) {
      updateVoteCount = 1;
    } else {
      updateVoteCount = -1;
    };

    VoteChoices.upsert(voteChoice._id, {
      $inc: { 
        count: updateVoteCount
      }
    });
  },
    removeUserVote:function(userVoteId){

      check(Meteor.userId(), String);
      check(userVoteId, String);

      VoteChoices.remove(userVoteId);

  }

});