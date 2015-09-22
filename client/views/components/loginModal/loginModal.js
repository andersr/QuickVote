Template.loginModal.onCreated(function(){

  this.autorun(function(){

    if (Session.get("loginViaModal") && Meteor.userId()) {
      $('#loginModal').modal('hide');
      Session.set("loginViaModal", false);
    };

  });
});

Template.loginModal.helpers({

  loginMessage: function(){

    switch (Router.current().route.getName()){
      case 'voteDetail':
        return "Please sign in to vote";      

      default:
        return "Please sign in to continue";
    };

  }

});
