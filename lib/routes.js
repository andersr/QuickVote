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

var goToHomeByDefault = function(pause) {
  if (Meteor.user()) {
    //TODO: check if a requested page was added to session, else...
    this.redirect('home');
  } else {
    this.next();
  }
};

Router.onBeforeAction(redirectAnonymousToLogin, {except: ['login']});
Router.onBeforeAction(goToHomeByDefault, {except: ['home']});

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