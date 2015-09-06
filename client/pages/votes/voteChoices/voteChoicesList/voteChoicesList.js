Template.voteChoicesList.helpers({
  // newVote: function(){
  //   return Session.get("newVote"); 
  // }

  voteChoices:function(){
    var voteId = Router.current().route.params._id;

    var voteChoices = VoteChoices.find({voteId: voteId});
    return voteChoices;
    // VoteChoices.find({}, {sort: {updatedAt: -1}});
    // return Tasks.find({}, {sort: {createdAt: -1}});
  }
});

Template.voteChoicesList.events({
  "click .delete-topic":function(e){
    e.preventDefault();

    var confirmDelete = confirm("Really delete this vote choice?");

    if(confirmDelete){
      Meteor.call('removeVoteChoice', this._id, function(error, result){
        if (error){
          console.log(error.reason);
        }
      });
    };
    
  }
});