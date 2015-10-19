Template.newVote.events({
  "click .new-vote": function(){
    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {
      Session.set("newVote", true);
    }; 
  }
});