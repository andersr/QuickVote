Template.appHeader.onCreated(function(){
  
  var currentView;
  var templateInstance = this;
  templateInstance.headerLeft = new ReactiveVar();

  templateInstance.autorun(function(){

    if (Router.current().route != undefined) {
      currentView = Router.current().route.getName();
    } else {
      currentView = "notFound";
    };

    if (Session.get("newVote")) {
      templateInstance.headerLeft.set('newVote');
    } else {
      templateInstance.headerLeft.set(currentView);
    };

  });

});

Template.appHeader.helpers({
  headerLeft: function(){

    switch (Template.instance().headerLeft.get()){
      case 'voteDetail':
        return {
          icon: "icon ion-chevron-left",
          event: "go-to-homepage",
          title: "View all Votes"
        };      

      case 'newVote':
        return {
          icon: "icon ion-close",
          event: "cancel-create-vote",
          title: "Cancel creating vote"
        };

      default:
        return {
          icon: "icon ion-plus",
          event: "new-vote",
          title: "New Vote"
        };
    };
  },

  userNavOpen: function(){
    return Session.get("userNavOpen");
  }
});

Template.appHeader.events({

  "click .new-vote": function(){

    //TODO: replicated in votesList - make DRY - eg with template helper

    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {
      Session.set("newVote", true);
    };
    
  },
  "click .go-to-homepage": function(){
     Router.go('home');
  },
  "click .cancel-create-vote": function(event){
    event.preventDefault();
    Session.set("newVote", false);
  },
  "click .login": function(){
     Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
  },

  "click .logout": function(event){
    // event.preventDefault();
    // Meteor.logout();
    Meteor.logout(function(error) {
      if(error){
        alert("There was a logout error: " + error.reason);
      }
    });
    Session.set("logout",true);
    Router.go('login');
  }
  
});