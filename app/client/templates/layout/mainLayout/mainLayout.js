Template.mainLayout.helpers({
  footer: function () {
  
    switch (Router.current().route.getName()){
      case 'voteDetail':
        return "voteFooter";
      default: 
        return "appFooter";
    };
    
  }
});

Template.mainLayout.events({
"click .logout":function(){ 

    Meteor.logout(function(err) {
      if(err){
        console.log(err);
      } else {
        Session.set("logout",true);
        Router.go("login");
      };
    });
  }
});