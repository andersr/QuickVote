Meteor.publish('topics', function() {
  return Topics.find(); 
});
Meteor.publish('votes', function() {
  return Votes.find(); 
});