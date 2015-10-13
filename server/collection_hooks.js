// Votes.before.remove(function(voteId, doc){

//   var voteId = doc._id; 
//   console.log("vote id: " + doc._id);

//   Meteor.call('removeRelatedUserVotes', voteId , function(error, result){
//     if (error){
//       console.log(error.reason);
//     } ;
//   });

//   Meteor.call('removeRelatedVoteChoices', voteId , function(error, result){
//       if (error){
//         console.log(error.reason);
//       } ;
//    });

// });

// Votes.before.remove(function(voteId, doc){
//    var voteId = doc._id; 
//   console.log("doc id: " + voteId);

//   Meteor.call('removeRelatedUserVotes', voteId , function(error, result){
//     if (error){
//       console.log(error.reason);
//     } ;
//   });

// });
