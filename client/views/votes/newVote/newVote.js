Template.newVote.events({
  "click .new-vote": function(){
    console.log('new vote');
    Router.go('newVote');
  }
});