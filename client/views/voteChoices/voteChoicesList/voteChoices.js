Template.voteChoices.helpers({
  newVote: function(){
    return Session.get("newVote"); 
  }

  // topics:function(){
  //   return VoteChoices.find({}, {sort: {updatedAt: -1}});
  //   // return Tasks.find({}, {sort: {createdAt: -1}});
  // }
});

Template.voteChoices.events({
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