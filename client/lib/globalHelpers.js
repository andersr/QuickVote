Template.registerHelper('isOwner', function(){
  var route = Router.current().route;

  if (route != undefined){

    var votes = Votes.find({_id: Router.current().params._id}, {limit: 1});

    if (votes.count() > 0){
      var vote = votes.fetch();
      return vote[0].owner === Meteor.userId();
    };

  } else {
    return false;
  };
  
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

Template.registerHelper('votingEnabled', function(){
  var route = Router.current().route;
  if (route != undefined){
   var votes = Votes.find({_id: Router.current().params._id}, {limit: 1});
    if (votes.count() > 0){
      var vote = votes.fetch();
      return vote[0].votingEnabled;
    };

  } else {
    return false;
  };
  
});