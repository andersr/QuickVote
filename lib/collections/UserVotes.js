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

    //this needs to be returned so that updateVoteCount can be called
    //TODO: find a better way to do this than passing variables back and forth like this
    // return {
    //   upVote: userVote.upVote,
    //   voteChoiceId: voteChoiceId._id
    // };

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

    //TODO: look for a more 'correct' way to increment a value in mongo
    // var updatedCount = voteChoice.count + addToVoteCount;

    //what if someone else adds to the vote count here?

    VoteChoices.upsert(voteChoice._id, {
      $inc: { 
        count: addToVoteCount
      }
    });

    //this needs to be returned so that updateVoteCount can be called
    //TODO: find a better way to do this than passing variables back and forth like this
    // return {
    //   upVote: userVote.upVote,
    //   voteChoiceId: userVoteAttributes.voteChoiceId
    // }

  }
});

    // change to db.collection.find({_id: "myId"}, {_id: 1}).limit(1)

    // var firstVote = UserVotes.find({
    //   voteChoiceId: userVoteAttributes.voteChoiceId,
    //   voterId: Meteor.userId()
    // }.limit(1));

    // if(userVote.count() === 1) {

    //   UserVotes.upsert(userVote._id, {
    //     $set: { 
    //       upVote: !userVote.upVote
    //     }
    //   });
    // } else {

    //   UserVotes.insert(userVote._id, {
    //     $set: { 
    //       upVote: !userVote.upVote
    //     }
    //   });

    // }

// updateVoteCount:function(userVoteAttributes){

//     check(Meteor.userId(), String);
//     check(userVoteAttributes, {
//       upVote: Boolean
//     });

//     var voteChoice = VoteChoices.findOne({_id: voteAttributes.voteChoiceId });

//     if(userVoteAttributes.upVote){

//       VoteChoices.upsert(voteChoice._id, {
//         $set: { 
//           count: voteChoice.count+1
//         }
//       });

//     } else {

//       VoteChoices.upsert(voteChoice._id, {
//         $set: { 
//           count: voteChoice.count-1
//         }
//       });
//     }

//   }