Template.deleteVote.helpers({

  isOwner: function(){
    return this.data.owner === Meteor.userId();
  }

});