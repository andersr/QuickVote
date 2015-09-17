Template.appHeader.onCreated(function(){

  var currentView   = Router.current().route.getName(),
      templateInstance  = this;

  templateInstance.headerCenterTemplate = new ReactiveVar(currentView);
     
  templateInstance.autorun(function(){

    if (Session.get("newVote")) {
      templateInstance.headerCenterTemplate.set('createVote');
    } else {
      templateInstance.headerCenterTemplate.set(Router.current().route.getName());
    };

  });

});

Template.appHeader.helpers({
  headerLeft: function(){

    switch (Router.current().route.getName()){
      case 'voteDetail':
        return {
          icon: "chevron-left",
          event: "go-to-homepage",
          title: "View all Votes"
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
      switch (Template.instance().headerCenterTemplate.get()){

        case 'voteDetail':
          return "voteTitle";

        case 'createVote':
          return "createVote";  

        default:
          return "appTitle";
    };
  }
});

Template.appHeader.events({

  "click .new-vote": function(){

    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {
      Session.set("newVote", true);
    };
    
  },
  "click .go-to-homepage": function(){
     Router.go('home');
  }
  
});