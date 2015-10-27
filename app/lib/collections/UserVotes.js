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

  userVoteDownVote:function(userVoteAttributes){

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
        upVote: false
      });

    } else {

      var userVote = UserVotes.findOne({
        voteChoiceId: userVoteAttributes.voteChoiceId,
        userId: Meteor.userId()
      });

      UserVotes.update(userVote._id, {
        $set: { 
          upVote: false
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
