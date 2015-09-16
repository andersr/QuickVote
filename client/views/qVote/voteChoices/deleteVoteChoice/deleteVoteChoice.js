Template.deleteVoteChoice.onCreated(function(){
   // console.log("on created vote choice: " + this.data._id);
});


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
