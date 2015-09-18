Meteor.publish('votes', function() {
  return Votes.find(); 
});

Meteor.publish('voteChoices', function() {
  return VoteChoices.find(); 
});

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
          "services.facebook.picture": true,
          "services.facebook.name": true
        }
      });
  } else {
    this.ready();
  }
});
