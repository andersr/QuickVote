Template.appHeader.helpers({
  showLogin: function(){
    if(outer.current().route.getName() === 'login'){
      return false;
    } else {
      return true;
    }
  }
});