Template.upDownVote.onCreated(function(){

  //allow for making template instance available inside autorun
  var templateInstance = this;

  //associate upvotes with a corresponding vote choice
  templateInstance.currentVoteChoice = new ReactiveVar(templateInstance.data._id);

  //enable determining if we should add a new vote or update an existing vote 
  templateInstance.firstVote = new ReactiveVar(true);

  //track the user vote for this vote choice
  templateInstance.currentVote = new ReactiveVar(false);


  //enable auto-checking for updates to this user's votes
  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      // check if user has voted previously
      if (Meteor.userId()) {

        var userVote = UserVotes.findOne({
          voteChoiceId:templateInstance.currentVoteChoice.get(),
          voterId: Meteor.userId()
        });

        if (userVote != undefined) {
          templateInstance.currentVote.set(userVote.upVote);
          templateInstance.firstVote.set(false);
        };
        // else {
        //   templateInstance.firstVote.set(true);
        //   templateInstance.currentVote.set(false);
        // }

      } else {
        templateInstance.firstVote.set(true);
        templateInstance.currentVote.set(false);
      };
    };
  });

});

Template.upDownVote.helpers({

  thumbIconToggle: function(){
    if (Template.instance().currentVote.get()) {
      return "thumbs-up";
    } else {
      return "thumbs-o-up";
    };
  },

  upDownVoteMsg: function(){
    if (Template.instance().currentVote.get()) {
      return "Upvote this choice";
    } else {
      return "Undo your upvote";
    };
  }

});

Template.upDownVote.events({

  "click .toggle-up-down-vote":function(){

    var voteChoiceId = Template.instance().currentVoteChoice.get();
    var upVote = Template.instance().currentVote.get();
    console.log("upVote on click: " + upVote);

    // if user is not signed in, ask to sign in before voting
    if (!Meteor.userId()) {
      $('#loginModal').modal('show');
    } else {
      //if this is their first time voting, create a new userVote for this vote choice
      if (Template.instance().firstVote.get()) {

        Meteor.call('newUserVote', voteChoiceId, function (error, result) {
          if (error){
            console.log(error.reason);
          };
        });

      } else {
        //if not, updating their existing vote choice
        console.log("not first vote...");

        var userVoteAttributes = {
          voteChoiceId: voteChoiceId,
          upVote: upVote
        };

        Meteor.call('toggleUpDownVote', userVoteAttributes, function (error, result) {

          if (error){
            console.log(error.reason);
          };
        });
      };
    }
  }
});