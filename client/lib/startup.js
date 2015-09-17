Meteor.startup(function(){

   sAlert.config({
      effect: 'stackslide', 
      position: 'bottom',
      timeout: 4000
      // html: false,
      // onRouteClose: true,
      // stack: true,
      // offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
      // beep: false
      // // examples:
      // // beep: '/beep.mp3'  // or you can pass an object:
      // // beep: {
      // //     info: '/beep-info.mp3',
      // //     error: '/beep-error.mp3',
      // //     success: '/beep-success.mp3',
      // //     warning: '/beep-warning.mp3'
      // // }
    });

  // Set default session values
  Session.setDefault({
    "newVote": true,
    "logout":false,
    "loginViaModal":false
  });

  Template.body.onRendered(function(){
    this.$(".dropdown").dropdown();
  });

});

