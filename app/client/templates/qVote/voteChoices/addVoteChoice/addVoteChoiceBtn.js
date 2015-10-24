Template.addVoteChoiceBtn.helpers({
  addVoteChoice: function(){
   return {
      icon: "icon ion-plus",
      event: "add-vote-choice",
      title: "Add vote choice."
    };
  }
  // ,

  // userNavOpen: function(){
  //   return Session.get("userNavOpen");
  // }
});

Template.addVoteChoiceBtn.events({

  "click .add-vote-choice": function(){
    Session.set("addVoteChoice", true);    
  }
  
});