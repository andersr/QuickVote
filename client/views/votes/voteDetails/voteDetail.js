Template.voteDetail.helpers({
  
  // votingOpen: function(){
  //   return Votes.findOne({_id: Router.current().params._id}).votingEnabled;
  // }
})

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
