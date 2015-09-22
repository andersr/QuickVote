Template.votesList.helpers({
  noVotes:function(){
    return Counts.get('votesCount') === 0;
  },
  creatingVote:function(){
    return Session.get("newVote");
  }
});


Template.votesList.events({

  "click .new-vote": function(){

    //TODO: replicated in votesList - make DRY - eg with template helper

    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {
      Session.set("newVote", true);
    };
    
  }
});

