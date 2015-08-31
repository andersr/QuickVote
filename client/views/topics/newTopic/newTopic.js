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

    //Associate a vote with this topic
    Votes.insert({
      topicId: topicId,
      voteCount: 0
    });

    //clear out form data after insert
    $('.new-topic-form')[0].reset();

  }
});

// Template inheritance, using the following package: https://atmospherejs.com/aldeed/template-extension
Template.newTopicNavBar.inheritsHelpersFrom("newTopic");
Template.newTopicNavBar.inheritsEventsFrom("newTopic");