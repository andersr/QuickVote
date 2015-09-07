Template.registerHelper('isOwner', function(){
  return Votes.findOne({_id: Router.current().params._id}).owner === Meteor.userId();
});

Template.registerHelper('votingOpen', function(){
   return Votes.findOne({_id: Router.current().params._id}).votingEnabled;
});