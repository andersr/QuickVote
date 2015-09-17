Template.appHeader.helpers({
  headerLeft: function(){
    
    var current_view = Router.current().route.getName();

    switch (current_view){
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
  }
  // ,
  // showLogin: function(){
  //   return Router.current().route.getName() !== 'login';
  // },
  // addingNewVote: function(){
  //   return Router.current().route.getName() === 'createVote';
  // }
});

Template.appHeader.events({

  "click .new-vote": function(){
    if (Meteor.user()) {
       Router.go('createVote');
    } else {
      console.log('show twbs login modal')
       // show twbs login modal $('#loginModal').modal('show');
    };
  },
  "click .go-to-homepage": function(){
     Router.go('home');
  }
  
});