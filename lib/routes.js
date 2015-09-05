Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

var redirectAnonymousToLogin = function(){
  if(!Meteor.userId()){
    this.redirect('login');
  } else {
    this.next();
  }
};

Router.onBeforeAction(redirectAnonymousToLogin, {except: ['login']});

Router.route('/', {
  name: 'home',
  action: function(){
    this.render();
  }
});

Router.route('/login', {
  name: 'login',
  action: function(){
    this.render();
  }
});