Template.sidebar.onRendered(function(){
  this.$('.ui.sidebar').sidebar();
});



// Template.sidebar.helpers({
//   showLogin: function(){
//     return Router.current().route.getName() !== 'login';
//   },
//   addingNewVote: function(){
//     return Router.current().route.getName() === 'createVote';
//   }
// });