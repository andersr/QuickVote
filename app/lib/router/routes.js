Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
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

var closeVoteChoiceForm = function() {
  Session.set("addVoteChoice", false);
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
Router.onStop(closeVoteChoiceForm, {only: ['voteDetail']});

// Router.onAfterAction(redirectIfDeleted, {only: ['voteDetail']});


Router.route('/votes/:_id', {
  name: 'voteDetail',
  waitOn:function(){
    return Meteor.subscribe('voteDetails', this.params._id);
  },
  data: function () {
    return Votes.findOne({_id: this.params._id});
  },
  
  //   title: function(){
  //   return Votes.findOne({_id: this.params._id}).title;
  // },
  action: function(){
    this.render();
  }
});


// LOGIN
Router.route('/login', {
  name: 'login',
  action: function(){
    this.render();
  }
});


// HOME
// :votesCountLimit?
Router.route('/', {
  name: 'home',
  action: function(){
    this.render();
  },
  // waitOn: function() { 
  //   return Meteor.subscribe('votes'); 
  // },
  //  data: function () {
  //   return Votes.find({}, {sort: {updatedAt: -1 }});
  // },
  fastRender: true
});
