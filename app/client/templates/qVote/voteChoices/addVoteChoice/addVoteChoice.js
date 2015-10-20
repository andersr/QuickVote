Template.addVoteChoice.onRendered(function(){
  $( "input[name=voteChoiceTitle]" ).focus();
});

Template.addVoteChoice.helpers({
  cancelAddVoteChoice: function () {
    return {
      icon: "icon ion-close",
      event: "cancel-add-vote-choice",
      title: "Cancel adding vote choice"
    };
  }
});

Template.addVoteChoice.events({
  "submit .add-vote-choice-form": function(event,template){
    event.preventDefault();
    var voteChoiceTitle = event.target.voteChoiceTitle.value;
    template.find("form").reset();
    var voteId = Router.current().params._id;
    var voteChoiceAttributes = {
      title: voteChoiceTitle,
      voteId: voteId
    };

    Meteor.call('addVoteChoice', voteChoiceAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      };
    });
  },
  "keyup input": function(e,t){
    e.preventDefault();

    if (e.keyCode == 27){
      Session.set("addVoteChoice", false);
    };
    e.stopPropagation();

  }
});


