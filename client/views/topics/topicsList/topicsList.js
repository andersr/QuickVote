Template.topicsList.helpers({
  topics:function(){
    return Topics.find({}, {sort: {createdAt: -1}});
    // return Tasks.find({}, {sort: {createdAt: -1}});
  }
});

Template.topicsList.events({
  "click .delete-topic":function(e){
    e.preventDefault();

    var confirmDelete = confirm("Really delete this topic?");

    if(confirmDelete){

      Meteor.call('removeTopic', this._id, function(error, result){
        if (error){
          console.log(error.reason);
        }
      });
      
    };
    
  }
});