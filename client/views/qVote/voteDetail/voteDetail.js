Template.appHeader.onCreated(function(){

  // var templateInstance  = this;

  // templateInstance.currentVoteId = new ReactiveVar(Router.current().params._id);
     
  // templateInstance.autorun(function(){

  //   if (Votes.find({_id: templateInstance.currentVoteId.get()}) == undefined) {
  //     Router.go('home');
  //     sAlert.info("This vote has been deleted.");
  //   };

  // });

});



Template.voteDetail.helpers({
  
  voteChoices:function(){
    return VoteChoices.find({voteId: Router.current().params._id }, {sort: {updatedAt: -1, count: -1, }});    
  }
});

Template.voteDetail.events({
  "submit .vote-title-form": function(event,template){
    //prevent unwanted default behavior for form submit
    event.preventDefault();

    //allow for exposing 'this' to internal functions, such as Meteor.call
    // var self = this;

    //get text entered into topicTitle field
    var voteTitle = event.target.voteTitle.value;

    var voteAttributes = {
      title: voteTitle
    };

    Meteor.call('createVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } else {

         //clear out form data after insert
         template.find("form").reset();

      }
    });

  }
});
