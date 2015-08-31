Template.topicsList.helpers({
  topics:function(){
    return Topics.find({});
    // return Tasks.find({}, {sort: {createdAt: -1}});
  }
});

Template.topicsList.events({
  "click .delete-topic":function(e){
    e.preventDefault();

    var confirmDelete = confirm("Really delete this topic?");

    if(confirmDelete){
      Topics.remove(this._id);
    };
    
  }
});