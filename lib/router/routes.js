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
  name: 'createVote',
  action: function(){
    this.render();
  }
});

// Router.route('/posts/:_id/', {
//   name: 'showPost',
//   template: 'showPost',
//   waitOn: function(){
//     Meteor.subscribe('posts', this.params._id);
//   },
//   data: function () {
//     //TODO: refactor this out - not needed if using waitOn?
//     return Posts.findOne({_id: this.params._id});
//   },
//   action: function () {
//     Session.set("editMode", false);
//     this.render();
//   }
// });

Router.route('/votes/:_id', {
  name: 'voteDetail',
  waitOn:function(){
    return Meteor.subscribe('votes', this.params._id);
  },
  data: function () {
    return Votes.findOne({_id: this.params._id});
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