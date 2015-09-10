Meteor.startup(function(){

  // Set default session values
  Session.setDefault({
    "newVote": true
  });

  Template.body.onRendered(function(){
    this.$(".dropdown").dropdown();
  });

});

