Template.voteControls.onCreated(function(){
  
  // var currentView;
  // var templateInstance = this;
  // templateInstance.headerLeft = new ReactiveVar();

  // templateInstance.autorun(function(){

  //   if (Router.current().route != undefined) {
  //     currentView = Router.current().route.getName();
  //   } else {
  //     currentView = "notFound";
  //   };

  //   if (Session.get("newVote")) {
  //     templateInstance.headerLeft.set('newVote');
  //   } else {
  //     templateInstance.headerLeft.set(currentView);
  //   };

  // });

});

Template.voteControls.helpers({
  addVoteChoice: function(){
   return {
      icon: "icon ion-plus",
      event: "add-vote-choice",
      title: "Add vote choice."
    };
  },

  userNavOpen: function(){
    return Session.get("userNavOpen");
  }
});

Template.voteControls.events({

  "click .add-vote-choice": function(){
    Session.set("addVoteChoice", true);    
  }
  // ,
  // "click .go-to-homepage": function(){
  //    Router.go('home');
  // },
  // "click .cancel-create-vote": function(event){
  //   event.preventDefault();
  //   Session.set("newVote", false);
  // },
  // "click .logout": function(event){
  //   event.preventDefault();
  //   Meteor.logout();
  //   Session.set("logout",true);
  //   Router.go('login');
  // }
  
});