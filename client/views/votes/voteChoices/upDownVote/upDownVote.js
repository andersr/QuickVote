Template.upDownVote.onCreated(function(){

  //set up a reactive variable for managing display of up/down vote buttons and collecting their vote count
  this.currentVote = new ReactiveVar("up");

});

Template.upDownVote.helpers({
  currentVote: function(){
    return Template.instance().currentVote.get();
  }

});

Template.upDownVote.events({

  "click .user-vote":function(){
    //user must be signed in to vote...
    if (Meteor.userId()) {
      var currentTemplate = Template.instance();
      var upDownVote = Template.instance().currentVote.get();
      var upVote;
      var nextVote;

      if(upDownVote === 'up'){
        upVote = true;
        nextVote = 'down';
      } else {
        upVote = false;
        nextVote = 'up';
      };

      var voteChoiceAttributes = {
        upVote:upVote,
        voteChoiceId: this._id
      }

      Meteor.call('updateVoteCount', voteChoiceAttributes, function (error, result) {
        if (error){
          console.log(error.reason);
        } else {
          currentTemplate.currentVote.set(nextVote);
        }

      });

    } else {
       $('#loginModal').modal('show');
    };

  }
});
