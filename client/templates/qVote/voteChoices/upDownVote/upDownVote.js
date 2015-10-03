Template.upDownVote.onCreated(function(){
  var templateInstance = this;
  templateInstance.currentVoteChoiceId = new ReactiveVar(templateInstance.data._id);

  templateInstance.previousVote = new ReactiveVar(false);

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {
        var userVote = UserVotes.find({
          voteChoiceId:templateInstance.currentVoteChoiceId.get(),
          userId: Meteor.userId()
        }, {limit: 1});

        if (userVote.count() > 0) {
          templateInstance.previousVote.set(userVote.upVote);
        };
      };
    };
  });

});

Template.upDownVote.helpers({

  thumbIconToggle: function(){
    if (Template.instance().previousVote.get()) {
      return "thumbs-up";
    } else {
      return "thumbs-o-up";
    };
  },

  upDownVoteMsg: function(){
    if (Template.instance().previousVote.get()) {
      return "Undo your upvote";
    } else {
      return "Upvote this choice";
    };
  }

});

Template.upDownVote.events({

  "click .toggle-up-down-vote":function(){

    if (!Meteor.userId()) {

      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');

    } else {

      var currentVoteChoice = VoteChoices.findOne({_id: Template.instance().currentVoteChoiceId.get()});

      var firstVote = UserVotes.find({userId: Meteor.userId(), voteChoiceId: currentVoteChoice._id }).count() > 0;

      console.log("first vote: " + firstVote);

      var userVoteAttributes = {
        voteId: currentVoteChoice.voteId, 
        voteChoiceId: Template.instance().currentVoteChoiceId.get()
      };

      if (firstVote) {

        Meteor.call('newUserVote', userVoteAttributes, function (error, result) {
          if (error){
            console.log(error.reason);
          } else {
            // QV.updateWinners(userVoteAttributes.voteChoiceId);
          };
        });

      } else {

        _.extend(userVoteAttributes, { upVote: !Template.instance().previousVote.get() });

        Meteor.call('upDownVote', userVoteAttributes, function (error, result) {
          if (error){
            console.log(error.reason);
          } else {
            // QV.updateWinners(userVoteAttributes.voteChoiceId);
          };
        });
      };

    }
  }
});