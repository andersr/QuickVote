UserVotes = new Mongo.Collection('userVotes');

Meteor.methods({

  // addUserVote:function(userVoteAttributes){

  //   check(Meteor.userId(), String);
  //   check(userVoteAttributes, {
  //     voteChoiceId: String
  //   });

  //   var userVoteAttributes = _.extend(userVoteAttributes, {
  //     voterId:Meteor.userId(),
  //     upVote:false
  //   });

  //   UserVotes.insert(userVoteAttributes);

  // },
  newUserVote:function(voteChoiceId){

    check(Meteor.userId(), String);
    check(voteChoiceId, String);

    var userId = Meteor.userId();

    var userVote = UserVotes.insert({
      voteChoiceId: voteChoiceId,
      voterId: userId,
      upVote: true
    });

    return userVote;

  },
  toggleUpDownVote:function(voteChoiceId){

    check(Meteor.userId(), String);
    check(voteChoiceId, String);

    var userId = Meteor.userId();

    // change to db.collection.find({_id: "myId"}, {_id: 1}).limit(1)

    var userVote = UserVotes.find({
      voteChoiceId: voteChoiceId,
      voterId: userId
    }.limit(1));

    UserVotes.upsert(userVote._id, {
       $set: { 
          upVote: !userVote.upVote
       }
    });
 
    // return {
    //   upVote: userVote.upVote
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