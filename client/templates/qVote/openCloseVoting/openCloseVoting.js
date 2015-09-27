Template.openCloseVoting.onCreated(function(){

  // var templateInstance  = this;
  // var voteId = Router.current().params._id;
  // var voteChoices = VoteChoices.find({voteId: voteId });
  // templateInstance.voteChoiceCount = new ReactiveVar();
     
  // templateInstance.autorun(function(){

  //   // var voteChoiceCount = VoteChoices.find({voteId: Router.current().params._id }).count();
  //   templateInstance.voteChoiceCount.set(voteChoices.count());

  // });

});

Template.openCloseVoting.onRendered(function(){
  this.$('.voteOpenClose').bootstrapToggle();
});

Template.openCloseVoting.onDestroyed(function(){
   this.$('.voteOpenClose').bootstrapToggle('destroy');
});

Template.openCloseVoting.helpers({
  votingIsOpen: function () {
    return Votes.findOne({_id: Router.current().params._id}).votingEnabled || false;
  }
  // ,
  // disableOpenCloseControl: function () {
  //   // var voteChoiceCount = VoteChoices.find({voteId: Router.current().params._id }).count();

  //   // if (voteChoiceCount <= 1) {
  //   //   return "disabled";
  //   // } else {
  //   //   return "";
  //   // };
  //   if (Template.instance().voteChoiceCount.get() < 2) {
  //     return "disabled";
  //   } else {
  //     return "";
  //   };
  // }
});


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

