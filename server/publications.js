Meteor.publish('votes', function() {
  return Votes.find(); 
});

Meteor.publish('voteChoices', function() {
  return VoteChoices.find(); 
});

Meteor.publish('userVotes', function() {
  return UserVotes.find({voterId: Meteor.userId()}); 
});