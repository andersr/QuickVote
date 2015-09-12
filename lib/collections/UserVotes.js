// UserVotes = new Mongo.Collection('userVotes');

// Meteor.methods({

//   userUpVote:function(userVoteAttributes){

//     check(Meteor.userId(), String);
//     check(userVoteAttributes, {
//       voteChoiceId: String,
//       upVote: Boolean
//     });

//     var userId = Meteor.userId();

//     //uses underscore.js - install with "meteor add underscore"
//     var userVote = _.extend(userVoteAttributes, {
//       voterId:userId
//     });

//     var voteChoice = VoteChoices.findOne({_id: voteAttributes.voteChoiceId });

//   }
// });

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