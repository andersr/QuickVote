Template.voteChoicesList.helpers({
  topics:function(){
    return VoteChoices.find({}, {sort: {updatedAt: -1}});
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