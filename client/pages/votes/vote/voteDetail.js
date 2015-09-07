Template.voteDetail.helpers({

  isOwner: function(){

    var currentVote = Votes.findOne({_id: Router.current().params._id});

    if (currentVote.owner === Meteor.userId()) {
      return true;
    } else {
      return false; 
    };
  }
})

Template.voteDetail.events({
  "submit .vote-title-form": function(event,template){
    //prevent unwanted default behavior for form submit
    event.preventDefault();

    //allow for exposing 'this' to internal functions, such as Meteor.call
    var self = this;

    //get text entered into topicTitle field
    var voteTitle = e.target.voteTitle.value;

    //This will only work with insecure turned on:
    // var topicId = Topics.insert({
    //   title: topicTitle,
    //   updatedAt: Date()
    // });

    // //Associate a vote with this topic
    // Votes.insert({
    //   topicId: topicId,
    //   voteCount: 0
    // });

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
