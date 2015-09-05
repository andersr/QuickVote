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
Router.onBeforeAction(goToHomeByDefault, {only: ['login']});

Router.route('/votes/new', {
  name: 'newVote',
  action: function(){
    this.render();
  }
});

Router.route('/votes/_:id', {
  name: 'vote',
  waitOn:function(){
    return Meteor.subscribe('vote', this.params._id);
  },
  action: function(){
    this.render();
  }
});



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