Template.votesList.helpers({
  noVotes:function(){
    return Counts.get('votesCount') === 0;
  },
  creatingVote:function(){
    return Session.get("newVote");
  },
  isOwner:function(){
    return this.owner === Meteor.userId();
  }
});


Template.votesList.events({

  "click .new-vote": function(){
    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {
      Session.set("newVote", true);
    }; 
  }

  // ,

  // "click .delete-vote": function(event, template){
  //   console.log(event.target.currentVote);

  //   // var confirmDelete = confirm("Really delete this vote?");

  //   // if(confirmDelete){
  //   //   Meteor.call('removeVote', this.voteId, function(error, result){
  //   //     if (error){
  //   //       console.log(error.reason);
  //   //     }
  //   //   });
  //   // };
  //   // sAlert.info("Vote deleted.");
  // }
});

