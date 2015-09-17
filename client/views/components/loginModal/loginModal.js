Template.loginModal.onCreated(function(){

  this.autorun(function(){

    if (Session.get("loginViaModal") && Meteor.userId()) {
      $('#loginModal').modal('hide');
      Session.set("loginViaModal", false);
    };

  });
});
