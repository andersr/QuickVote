UserVotes = new Mongo.Collection('userVotes');

Meteor.methods({

  newUserVote:function(voteChoiceId){

    check(Meteor.userId(), String);
    check(voteChoiceId, String);

    var userId = Meteor.userId();

    var userVote = UserVotes.insert({
      voteChoiceId: voteChoiceId,
      voterId: userId,
      upVote: true
    });

    //TODO: separate this out into its own function
    var voteChoice = VoteChoices.findOne({
        _id: voteChoiceId 
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
    var toggleVote = !userVoteAttributes.upVote;

    var userVote = UserVotes.findOne({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      voterId: userId
    });

    UserVotes.upsert(userVote._id, {
       $set: { 
          upVote: toggleVote
       }
    });

    //TODO: move updating of voteChoice to separate function
    var addToVoteCount;

    if (toggleVote) {
      addToVoteCount = 1;
    } else {
      addToVoteCount = -1;
    };

    //update vote count
    var voteChoice = VoteChoices.findOne({
        _id: userVoteAttributes.voteChoiceId 
    });

    VoteChoices.upsert(voteChoice._id, {
      $inc: { 
        count: addToVoteCount
      }
    });
  }
});