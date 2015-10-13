Meteor.startup(function(){

  Session.setDefault({
    "newVote": false,
    "logout":false,
    "loginViaModal":false,
    "userNavOpen": false
  });

});
