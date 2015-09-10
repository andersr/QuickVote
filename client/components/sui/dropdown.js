Template.userNavDropDown.onRendered(function(){
  this.$(".dropdown").dropdown();
});

Template.userNavDropDown.events({
  "click .logout":function(){ 

    Meteor.logout(function(err) {
      if(err){
        console.log(err);
      } else {
         Router.go("login");
      };
    });
  }
});