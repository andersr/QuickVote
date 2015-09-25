Template.registerHelper('isOwner', function(){
  // var owner = Votes.findOne({_id: Router.current().params._id}).owner;
  // var user = Meteor.userId();
  // console.log("owner: " + owner + ", user: " + user);
     if (Router.current().route != undefined) {
     return Votes.findOne({_id: Router.current().params._id}).owner === Meteor.userId();
    }
  
});

Template.registerHelper('isHomePage', function(){
     if (Router.current().route != undefined) {
     return Router.current().route.getName() === 'home';
    };
  
 
});

Template.registerHelper('isLoginPage', function(){
       if (Router.current().route != undefined) {
      return Router.current().route.getName() === 'login';
    };


});

Template.registerHelper('isCreatingVote', function(){
        if (Router.current().route != undefined) {
     return Router.current().route.getName() === 'createVote';
    };


  
});


// Template.registerHelper('appTitle', function(){
//   return QVConstants.appTitle;
// });

// Template.registerHelper('pageTitle', function(){
//   var currentView;
//   console.log('pageTitle helper: ' + Router.current().route);

//   if (Router.current().route != undefined) {
//     currentView = Router.current().route.getName();
//   } else {
//     currentView = "notFound";
//   };
//   return QV.pageTitles.currentView;
// });


Template.registerHelper('votingIsOpen', function(){
   return Votes.findOne({_id: Router.current().params._id}).votingEnabled;
});