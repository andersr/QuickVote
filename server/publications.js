Meteor.publish('votes', function() {
  Counts.publish(this, 'votesCount', Votes.find());
  return Votes.find(); 
});

Meteor.publish('voteChoices', function() {
  return VoteChoices.find(); 
});

// Meteor.publish('votes', function() {
  
// });

Meteor.publish('userVotes', function() {
  // return UserVotes.find(); 
  return UserVotes.find({voterId: this.userId}); 
});

// TODO: Only publish tags for this author:
/// return Tags.find({authors: Meteor.userId() }); 

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find( {_id: this.userId},
      {fields: 
        {
          "services.google.picture": true,
          "services.google.name": true,
          "services.facebook.id": true,
          "services.facebook.name": true
        }
      });
  } else {
    this.ready();
  }
});
