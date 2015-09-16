// Template.votingEnabled.onCreated(function(){
//   var votingEnabled = Votes.findOne({_id: Router.current().params._id}).votingEnabled;

//   // if (votingEnabled) {
//   //   this.$('.voteOpenClose').bootstrapToggle('on');
//   // } else {
//   //   this.$('.voteOpenClose').bootstrapToggle('off');
//   // };

// });


// Template.votingEnabled.onRendered(function(){
//   var votingEnabled = Votes.findOne({_id: Router.current().params._id}).votingEnabled;

//   if (votingEnabled) {
//     // this.$('.voteOpenClose').bootstrapToggle('on');
//   } else {
//     // this.$('.voteOpenClose').bootstrapToggle('off');
//   };

// });

// Template.votingOpenClosed.helpers({
//   isOpen: function(){
//     return "checked";
//   }
// });


Template.votingEnabled.events({
  "change .voteOpenClose": function(event){

    console.log( $(event.target).is(':checked'));

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

// Template.votingEnabled.onDestroyed(function(){
//    this.$('.voteOpenClose').bootstrapToggle('destroy');
// });