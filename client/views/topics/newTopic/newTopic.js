Template.newTopic.helpers({
  // clearForm: function(){
  //   if(Session.get("topicAdded")){
  //     $('.new-topic-form')[0].reset();
  //     Session.set("topicAdded", false);
  //   }
  // }
  // ,
  // topicAdded: function(){
  //   return Session.get("topicAdded");
  // }
})

Template.newTopic.events({
  "submit .new-topic-form": function(e){
    //prevent unwanted default behavior for form submit
    e.preventDefault();

    //allow for exposing 'this' to internal functions, such as Meteor.call
    var self = this;

    //get text entered into topicTitle field
    var topicTitle = e.target.topicTitle.value;

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

    var topicAttributes = {
      title: topicTitle
    };

    Meteor.call('addTopic', topicAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      }
    });

     //clear out form data after insert
     //TODO: wait for topic id to be returned before doing reset (currently above action is async)
    $('.new-topic-form')[0].reset();

  }
});
