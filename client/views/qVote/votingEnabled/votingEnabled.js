Template.votingEnabled.onRendered(function(){
  this.$('.voteOpenClose').bootstrapToggle();
});

Template.votingEnabled.onDestroyed(function(){
   this.$('.voteOpenClose').bootstrapToggle('destroy');
});

Template.votingEnabled.helpers({
  votingEnabled: function () {
    return Votes.findOne({_id: Router.current().params._id}).votingEnabled || false;
  },
  enableOpenCloseVoteControl: function () {
    // return true if there are two or more items to vote on
  }
});


Template.votingEnabled.events({
  "change .voteOpenClose": function(event){

    var voteAttributes = {
      voteId: Router.current().params._id,
      votingEnabled: $(event.target).is(':checked')
    };

    Meteor.call('openCloseVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      }
    });
  }
});

