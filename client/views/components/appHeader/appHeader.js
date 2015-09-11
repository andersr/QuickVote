Template.appHeader.onRendered(function(){
  this.$(".dropdown").dropdown();
  this.$('.sidebar-menu-popup').popup();
});



Template.appHeader.helpers({
  showLogin: function(){
    return Router.current().route.getName() !== 'login';
  },
  addingNewVote: function(){
    return Router.current().route.getName() === 'createVote';
  }
});