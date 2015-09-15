UserVotes = new Mongo.Collection('userVotes');

Meteor.methods({

  addUserVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String
    });

    var userVoteAttributes = _.extend(userVoteAttributes, {
      voterId:Meteor.userId(),
      upVote:false
    });

    UserVotes.insert(userVoteAttributes);

  }
  // ,
  // updateUserVote:function(userVoteAttributes){

  //   check(Meteor.userId(), String);
  //   check(userVoteAttributes, {
  //     voteChoiceId: String,
  //     upVote: Boolean
  //   });

  //   // var userVote = _.extend(userVoteAttributes, {
  //   //   voterId:Meteor.userId()
  //   // });

  //   var userVote = UserVotes.findOne({_id: voteAttributes.voteChoiceId });

  // }
});

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