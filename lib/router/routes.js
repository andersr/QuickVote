Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  title: "QuickVote"
});

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound'
});

var anonymousCreateVote = function(){
  if(!Meteor.user()){
    this.redirect('login');
  } else {
    this.next();
  }
};

var goToHomeByDefault = function(pause) {
  if (Meteor.user()) {
       this.redirect('home');
  } else {
    this.next();
  }
};

var logoutAlert = function(pause) {
  if (Session.get("logout")) {
     sAlert.info("You've been signed out");
     Session.set("logout",false);
  };
};


// var redirectIfDeleted = function(pause) {
//   if (this.params._id == null || this.params._id == undefined) {
//     this.redirect('home');
//      sAlert.info("This vote has been deleted");
//   };
// };


Router.onBeforeAction(anonymousCreateVote, {only: ['createVote']});
Router.onBeforeAction(goToHomeByDefault, {only: ['login']});
Router.onAfterAction(logoutAlert, {only: ['login']});
// Router.onAfterAction(redirectIfDeleted, {only: ['voteDetail']});


Router.route('/votes/:_id', {
  name: 'voteDetail',
  waitOn:function(){
    return Meteor.subscribe('votes', this.params._id);
  },
  data: function () {
    return Votes.findOne({_id: this.params._id});
  },
    title: function(){
    return Votes.findOne({_id: this.params._id}).title || "QuickVote";
  },
  action: function(){
    this.render();
  }
});


// HOME
Router.route('/', {
  name: 'home',
  action: function(){
    this.render();
  },
  waitOn: function() { 
    return Meteor.subscribe('votes'); 
  },
   data: function () {
    return Votes.find({}, {sort: {updatedAt: -1 }});
  },
  fastRender: true
});

// LOGIN
Router.route('/login', {
  name: 'login',
  title: function(){
    return "Please Sign In";
  },
  action: function(){
    this.render();
  }
});
