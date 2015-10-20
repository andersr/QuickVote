Meteor.startup(function(){

  Session.setDefault({
    "newVote": false,
    "addVoteChoice": false,
    "logout":false,
    "loginViaModal":false,
    "userNavOpen": false
  });

});
