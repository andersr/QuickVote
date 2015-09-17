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
  ,
  "click .toggle-sidebar":function(){

    $('.ui.sidebar').sidebar('toggle');

  },
  "click .close-sidebar":function(){

    $('.ui.sidebar').sidebar('toggle');

  }
});