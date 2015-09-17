Template.createVote.onRendered(function(){
  $( "input[name=voteTitle]" ).focus();
});

Template.createVote.events({
  "submit .create-vote-form": function(event,template){
    event.preventDefault();

    var voteTitle = event.target.voteTitle.value;

    var voteAttributes = {
      title: voteTitle
    };

    Meteor.call('createVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } else {
        Router.go('voteDetail', { _id: result.voteId });
      }
    });
  },
  "click .cancel-create-vote": function(event,template){
    event.preventDefault();
    Session.set("newVote", false);
  }
});