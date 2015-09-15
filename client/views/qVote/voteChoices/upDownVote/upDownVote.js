Template.upDownVote.onCreated(function(){

  // this.isUpVote = new ReactiveVar(false);

  if(Meteor.userId()){

    var currentUserVote = UserVotes.findOne({voteChoiceId: this.data._id, voterId: Meteor.userId() });
      

      this.isUpVote = new ReactiveVar(currentUserVote.upVote);

  } else {

    //assume they have not voted and set all votes to default
    this.isUpVote = new ReactiveVar(false);

  };



});

Template.upDownVote.helpers({
  // currentUserVote: function(){

   


  // },
  thumbIconToggle: function(){

    if (Template.instance().isUpVote.get()) {
      return "thumbs-up";
    } else {
      return "thumbs-o-up";
    };

  },

  upDownVoteMsg: function(){

    // if (Template.instance().currentVote.get() === "upVote") {
    //   return "Upvote this choice";
    // } else {
    //   return "Undo your upvote";
    // };

  }


});

Template.upDownVote.events({

  "click .up-down-vote":function(){
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
