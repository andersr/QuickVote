Template.newTopic.events({
  "submit .new-todo": function(e,t){

    // console.log("form submitted");

    var topicTitle = e.target.title.value;

    var topicId = Topics.insert({
      title: topicTitle,
      updateAt: new Date()
    });
    // debugger;

    // console.log(topicId);

    //reset the input field
    // document.getElementByClassName('new-todo')[0].reset();

  }
});