Template.cancelAddVoteChoice.events({
  "click .cancel-add-vote-choice": function(event){
    Session.set("addVoteChoice", false);
  }
});