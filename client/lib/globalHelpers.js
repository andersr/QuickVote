Template.registerHelper('isOwner', function(){
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

Template.registerHelper('newVote', function(){
  return Session.get("newVote");
});

Template.registerHelper('votingIsOpen', function(){
   return Votes.findOne({_id: Router.current().params._id}).votingEnabled;
});