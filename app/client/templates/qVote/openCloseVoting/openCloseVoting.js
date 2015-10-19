Template.openCloseVoting.onRendered(function(){
  this.$('.voteOpenClose').bootstrapToggle();
});

Template.openCloseVoting.onDestroyed(function(){
   this.$('.voteOpenClose').bootstrapToggle('destroy');
});

// Template.openCloseVoting.helpers({
//   votingEnabled: function () {
//     return Votes.findOne({_id: Router.current().params._id}).votingEnabled || false;
//   }
// });


Template.openCloseVoting.events({
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

