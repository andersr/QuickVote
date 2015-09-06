Meteor.startup(function(){

  // Set default session values
  Session.setDefault({
    "newVote": true,
    "votingOpen":false
  });

});

