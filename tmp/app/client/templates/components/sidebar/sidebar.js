Template.sidebar.onCreated(function(){
  var instance = this;

  instance.autorun(function(){
    var subscription = instance.subscribe('votes');

    // if (true) {};
  });



  instance.votes = function(){
    return Votes.find({});
  }
});

Template.sidebar.onRendered(function(){
  this.$('.ui.sidebar').sidebar();
});



Template.sidebar.helpers({
  votes: function(){
    return Template.instance().votes();
  }
});