Meteor.startup(function(){

  sAlert.config({
     effect: 'stackslide', 
     position: 'bottom',
     timeout: 3500
  });

  Session.setDefault({
    "newVote": false,
    "logout":false,
    "loginViaModal":false,
    "userNavOpen": false
  });

});

