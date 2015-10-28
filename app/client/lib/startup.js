Meteor.startup(function(){

  Session.setDefault({
    "newVote": false,
    "addVoteChoice": false,
    "logout":false,
    "loginViaModal":false,
    "userNavOpen": false,
    "chromeiOS": false
  });

  // var currentBrowser = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  // var currentPlatform = /iPad|iPhone|iPod/.test(navigator.platform);

  // if (currentPlatform == 'iOS' && currentBrowser == 'chrome'){
  //  Session.set("chromeiOS", true);
  // };


  

});
