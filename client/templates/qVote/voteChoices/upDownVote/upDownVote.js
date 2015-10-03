Template.upDownVote.onCreated(function(){
  var templateInstance = this;

  templateInstance.currentVoteChoiceId = new ReactiveVar(templateInstance.data._id);
  templateInstance.previousVote = new ReactiveVar();

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {

        var hasVoted = UserVotes.find({
          voteChoiceId:templateInstance.currentVoteChoiceId.get(),
          userId: Meteor.userId()
        }, {limit: 1}).count() > 0;

        if (hasVoted) {
          var upVote = UserVotes.findOne({
          voteChoiceId:templateInstance.currentVoteChoiceId.get(),
          userId: Meteor.userId()
          }).upVote;
          templateInstance.previousVote.set(upVote);
        } else {
          templateInstance.previousVote.set(false);          
        };
      };
    };
  });

});

Template.upDownVote.helpers({

  thumbIconToggle: function(){
    if (Template.instance().previousVote.get()) {
      console.log("toggle: " + Template.instance().previousVote.get());
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
      var firstVote = UserVotes.find({
        userId: Meteor.userId(),
        voteChoiceId:Template.instance().currentVoteChoiceId.get() 
      }).count() === 0;

      // console.log("vote choice id: " + Template.instance().currentVoteChoiceId.get());

      var userVoteAttributes = {
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

        // _.extend(userVoteAttributes, { upVote: !Template.instance().previousVote.get() });

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