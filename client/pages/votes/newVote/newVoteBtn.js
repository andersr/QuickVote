Template.newVoteBtn.events({
  "click .new-vote": function(){
    if (Meteor.user()) {
       Router.go('createVote');
    } else {
       $('#loginModal').modal('show');
    };
   
  }
});