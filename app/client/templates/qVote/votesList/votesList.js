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

  // "click .new-vote": function(){
  //   if (!Meteor.userId()) {
  //     Session.set("loginViaModal", true);
  //     $('#loginModal').modal('show');
  //   } else {
  //     Session.set("newVote", true);
  //   }; 
  // }
});

