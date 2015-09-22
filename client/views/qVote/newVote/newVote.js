Template.newVote.onRendered(function(){
  $( "input[name=voteTitle]" ).focus();
});

Template.newVote.events({
  "submit .new-vote-form": function(event,template){
    // console.log("submitted new vote");
    event.preventDefault();

    var voteTitle = event.target.voteTitle.value;

    var voteAttributes = {
      title: voteTitle
    };

    Meteor.call('createVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } else {
        Session.set("newVote", false);
        Router.go('voteDetail', { _id: result.voteId });
      }
    });
  }
});