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
      voteChoiceId: String
    });

    var voteChoice = VoteChoices.findOne({ _id: userVoteAttributes.voteChoiceId });
 
    var userVote = UserVotes.insert({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      voteId: voteChoice.voteId,
      userId: Meteor.userId(),
      upVote: true
    });

    Meteor.call('increaseVoteChoiceCount', userVoteAttributes.voteChoiceId,
      function (error, result) {
        if (error){
        console.log(error.reason);
        }
      }
    );

    // return {
    //   voteId: userVote.voteId,
    //   voteChoiceId: userVote.voteChoiceId
    // };

  },

  upDownVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String,
      upVote: Boolean
    });

    var userId = Meteor.userId();    
    var voteChoice = VoteChoices.findOne({ _id: userVoteAttributes.voteChoiceId });

    var userVote = UserVotes.findOne({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      userId: userId
    });

    UserVotes.update(userVote._id, {
      $set: { 
        upVote: userVoteAttributes.upVote
      }
    });

    Meteor.call('updateVoteChoiceVoteCount', userVoteAttributes, function (error, result) {
      if (error){
        console.log(error.reason);
      }
    });

  },
  removeUserVote:function(userVoteId){

      check(Meteor.userId(), String);
      check(userVoteId, String);

      UserVotes.remove(userVoteId);

  }

});