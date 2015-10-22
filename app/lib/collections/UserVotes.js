UserVotes = new Mongo.Collection('userVotes');

UserVotes.after.insert(function (userId, doc) {  
  Meteor.call('updateVoteChoiceCount', {voteChoiceId: doc.voteChoiceId, upVote: doc.upVote }, function (error, result) {
    if (error){
      console.log(error.reason);
    } else {
      QV.updateVoteWinners(result.voteId);
    };
  });
});

UserVotes.after.update(function (userId, doc) {
  Meteor.call('updateVoteChoiceCount', {voteChoiceId: doc.voteChoiceId, upVote: doc.upVote }, function (error, result) {
    if (error){
      console.log(error.reason);
    } else {
      QV.updateVoteWinners(result.voteId);
      // Meteor.call('updateVoteWinners', doc.voteChoiceId, function (error, result) {
      //   if (error){ console.log(error.reason);}
      // });
    }
  });
});



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

  userVoteUpVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String,
      firstVote: Boolean
    });

    var voteChoice = VoteChoices.findOne({ _id: userVoteAttributes.voteChoiceId });

    if (userVoteAttributes.firstVote) {

      var userVote = UserVotes.insert({
        voteChoiceId: userVoteAttributes.voteChoiceId,
        voteId: voteChoice.voteId,
        userId: Meteor.userId(),
        upVote: true
      });

    } else {

      var userVote = UserVotes.findOne({
        voteChoiceId: userVoteAttributes.voteChoiceId,
        userId: Meteor.userId()
      });

      UserVotes.update(userVote._id, {
        $set: { 
          upVote: true
        }
      });
    };
  },


  userVoteUpDownVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String,
      upVote: Boolean,
      firstVote: Boolean
    });

    var voteChoice = VoteChoices.findOne({ _id: userVoteAttributes.voteChoiceId });

    if (userVoteAttributes.firstVote) {

      var userVote = UserVotes.insert({
        voteChoiceId: userVoteAttributes.voteChoiceId,
        voteId: voteChoice.voteId,
        userId: Meteor.userId(),
        upVote: userVoteAttributes.upVote
      });

    } else {

      var userVote = UserVotes.findOne({
        voteChoiceId: userVoteAttributes.voteChoiceId,
        userId: Meteor.userId()
      });

      UserVotes.update(userVote._id, {
        $set: { 
          upVote: userVoteAttributes.upVote
        }
      });
    };
  },

  removeUserVote:function(userVoteId){
      check(Meteor.userId(), String);
      check(userVoteId, String);
      UserVotes.remove(userVoteId);
  }

});
