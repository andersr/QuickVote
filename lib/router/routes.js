Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

// var redirectAnonymousToLogin = function(){
//   if(!Meteor.user()){
//     this.redirect('login');
//   } else {
//     this.next();
//   }
// };

var anonymousCreateVote = function(){
  if(!Meteor.user()){
    // Session.set("wantsToCreateVote", true);
    this.redirect('login');
  } else {
    this.next();
  }
};

// var createVoteRedirect = function(){
//   if(Ses){
//     this.redirect('login');
//   } else {
//     this.next();
//   }
// };

var goToHomeByDefault = function(pause) {
  if (Meteor.user()) {
    // if (Session.get("wantsToCreateVote")) {
    //   Session.set("wantsToCreateVote", false);
    //   this.redirect('createVote');
    // } else {
       this.redirect('home');
    // };
   
  } else {
    this.next();
  }
};

Router.onBeforeAction(anonymousCreateVote, {only: ['createVote']});

Router.onBeforeAction(goToHomeByDefault, {only: ['login']});


// CREATE VOTE
Router.route('/votes/new',{
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
  waitOn:function(){
    return Meteor.subscribe('votes');
  },
  data: function () {
    return Votes.find({});
  },
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