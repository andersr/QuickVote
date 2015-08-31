Template.newTopic.events({
  "submit .new-topic-form": function(e){

    //prevent unwanted default browser behavior for form submit
    e.preventDefault();


    //get text entered into topicTitle field
    var topicTitle = e.target.topicTitle.value;

    //add new topic record to db (this approach will only work with insecure turned on)
    var topicId = Topics.insert({
      title: topicTitle,
      updatedAt: Date()
    });

    //clear out form data after insert
    $('.new-topic-form')[0].reset();

  }
});