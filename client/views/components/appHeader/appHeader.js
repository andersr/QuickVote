Template.appHeader.onCreated(function(){

  var currentView       = Router.current().route.getName(),
      templateInstance  = this
  ;

  templateInstance.headerLeft = new ReactiveVar();
  templateInstance.headerCenter = new ReactiveVar();
     
  templateInstance.autorun(function(){

    if (Session.get("newVote")) {
      templateInstance.headerLeft.set('createVote');
      templateInstance.headerCenter.set('createVote');
    } else {
      templateInstance.headerLeft.set(Router.current().route.getName());
      templateInstance.headerCenter.set(Router.current().route.getName());
    };

  });

});

Template.appHeader.onRendered(function(){
  $('.dropdown-toggle').dropdown();
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

      case 'createVote':
        return {
          icon: "times",
          event: "cancel-create-vote",
          title: "Cancel creating vote"
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
  },
  "click .cancel-create-vote": function(event){
    event.preventDefault();
    Session.set("newVote", false);
  }
  
});