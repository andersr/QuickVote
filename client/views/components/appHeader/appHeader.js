Template.appHeader.onCreated(function(){
  var currentView;

  if (Router.current().route != undefined) {
    currentView = Router.current().route.getName();
  } else {
    currentView = "notFound";
  };

  var templateInstance  = this;

  templateInstance.headerLeft = new ReactiveVar();
  templateInstance.headerCenter = new ReactiveVar();
     
  templateInstance.autorun(function(){

    if (Session.get("newVote")) {
      templateInstance.headerLeft.set('newVote');
      templateInstance.headerCenter.set('newVote');
    } else {
      templateInstance.headerLeft.set(currentView);
      templateInstance.headerCenter.set(currentView);
    };

  });

});

Template.appHeader.onRendered(function(){

  // $('.user-nav .dropdown').on('shown.bs.dropdown', function(){
  //   Session.set("userNavOpen", true);   
  // });

  // $('.user-nav .dropdown').on('hidden.bs.dropdown', function(){
  //   Session.set("userNavOpen", false);
     
  // });

});

Template.appHeader.helpers({
  headerLeft: function(){

    switch (Template.instance().headerLeft.get()){
      case 'voteDetail':
        return {
          icon: "chevron-left",
          event: "go-to-homepage",
          title: "View all Votes"
        };      

      case 'newVote':
        return {
          icon: "times",
          event: "cancel-create-vote",
          title: "Cancel creating vote"
        };

     case 'notFound':
        return {
          icon: "",
          event: "",
          title: ""
        };      


      default:
        return {
          icon: "plus",
          event: "new-vote",
          title: "New Vote"
        };
    };
  },
    headerCenter: function(){    
      switch (Template.instance().headerCenter.get()){

        case 'voteDetail':
          return "voteTitle";

        case 'newVote':
          return "newVote";  

        default:
          return "pageTitle";
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
  "click .logout": function(event){
    event.preventDefault();
    Meteor.logout();
    Session.set("logout",true);
    Router.go('login');
  }
  
});