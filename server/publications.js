Meteor.publish('votes', function() {
  return Votes.find(); 
});
Meteor.publish('voteChoices', function() {
  return VoteChoices.find(); 
});