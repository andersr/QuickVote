Template.appHeader.helpers({
  showLogin: function(){
    return Router.current().route.getName() !== 'login';
  },
  addingNewVote: function(){
    return Router.current().route.getName() === 'createVote';
  }
  // ,
  //  isHomePage:function(){
  //   return Router.current().route.getName() === 'home';
  // }
});