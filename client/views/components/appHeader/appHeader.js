Template.appHeader.onRendered(function(){
  this.$(".dropdown").dropdown();
});



Template.appHeader.helpers({
  showLogin: function(){
    return Router.current().route.getName() !== 'login';
  },
  addingNewVote: function(){
    return Router.current().route.getName() === 'createVote';
  }
});