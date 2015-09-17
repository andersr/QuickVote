Template.deleteVoteChoice.events({
  "click .delete-vote-choice":function(){
    var confirmDelete = confirm("Really delete this vote choice?");

    if(confirmDelete){
      Meteor.call('removeVoteChoice', this.currentVoteChoiceId, function(error, result){
        if (error){
          console.log(error.reason);
        }
      });
    }; 
  }
});
