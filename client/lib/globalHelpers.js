Template.registerHelper('isOwner', function(){
  return Votes.findOne({_id: Router.current().params._id}).owner === Meteor.userId();
});

Template.registerHelper('isHomePage', function(){
  return Router.current().route.getName() === 'home';
});

Template.registerHelper('appTitle', function(){
  return QVConstants.appTitle;
});


Template.registerHelper('votingOpen', function(){
   return Votes.findOne({_id: Router.current().params._id}).votingEnabled;
});