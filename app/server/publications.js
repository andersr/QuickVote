Meteor.publish('votes', function(limit) {
  Counts.publish(this, 'votesCount', Votes.find());
  return Votes.find({}, {limit: limit}); 
});

Meteor.publish('voteChoices', function() {
  return VoteChoices.find(); 
});

Meteor.publish('userVotes', function() {
  return UserVotes.find({userId: this.userId}); 
});

// Meteor.publish('voteWinners', function() {
//   return VoteWinners.find(); 
// });


Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find( {_id: this.userId});
  } else {
   this.ready();
  }
});

// ,
//       {fields: 
//         {
//           "services.google.picture": true,
//           "services.google.name": true,
//           "services.facebook.id": true,
//           "services.facebook.name": true,
//           profile: true
//         }
//       }
