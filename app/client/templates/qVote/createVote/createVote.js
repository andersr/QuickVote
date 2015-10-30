Template.createVote.onRendered(function(){
  $( "#voteTitle" ).focus();
});

Template.createVote.events({

  'submit .new-vote-form': function(event) {
    event.preventDefault();
     if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
      return;
     };

    var $input = $(event.target).find('[type=text]');
    if (! $input.val())
      return;

     // console.log("text input: " + $input.val());

      var voteAttributes = {
        title: $input.val()
      };

    Meteor.call('createVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } else {

        Session.set("newVote", false);
        Router.go('voteDetail', { _id: result.voteId });
        Session.set("addVoteChoice", true);
      }
    });

    $input.val('');
  }

});
