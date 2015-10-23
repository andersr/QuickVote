Template.fooTest.onCreated(function(){

  // this.voteId = new ReactiveVar(this.data._id);

  console.log("fooTest: " + this.data._id);

});

Template.fooTest.events({
  "click .delete-vote":function(){

    var voteId = Template.instance().voteId.get();
    var confirmDeleteVote = confirm("Really delete this vote?");

    if(confirmDeleteVote){

      Meteor.call('deleteVote', voteId, function(error, result){
        if (error){
          console.log(error.reason);
        } else {

          sAlert.info("Vote deleted.");

        }
      });

    }; 
  }

});
