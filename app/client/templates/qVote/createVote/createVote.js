Template.createVote.onRendered(function(){
  $( "input[name=voteTitle]" ).focus();
});

Template.createVote.events({
  "submit .new-vote-form": function(event,template){
    // console.log("submitted new vote");
    event.preventDefault();

    //check again for meteor user id

    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {

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
        Session.set("addVoteChoice", true);
      }
    });



      
    };

    
  }
  ,
  "keyup input": function(e,t){
    e.preventDefault();

    if (e.keyCode == 27){
      Session.set("newVote", false);
    };
    e.stopPropagation();

  }
});