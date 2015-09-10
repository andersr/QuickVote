Template.newVote.events({
  "click .new-vote": function(){
    if (Meteor.user()) {
       Router.go('createVote');
    } else {
      console.log('loginModal')
       // $('#loginModal').modal('show');
    };
   
  }
});