Template.appHeader.helpers({
  showLogin: function(){
    if(Router.current().route.getName() === 'login'){
      return false;
    } else {
      return true;
    }
  }
});