Template.upDownVote.onCreated(function(){
  var templateInstance = this;
  templateInstance.currentVoteChoice = new ReactiveVar(templateInstance.data._id);

  templateInstance.firstVote = new ReactiveVar(true);
  templateInstance.currentVote = new ReactiveVar(false);

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {
        var userVote = UserVotes.findOne({
          voteChoiceId:templateInstance.currentVoteChoice.get(),
          voterId: Meteor.userId()
        });

        if (userVote != undefined) {
          templateInstance.currentVote.set(userVote.upVote);
          templateInstance.firstVote.set(false);
        };

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
      return "Undo your upvote";
    } else {
      return "Upvote this choice";
    };
  }

});

Template.upDownVote.events({

  "click .toggle-up-down-vote":function(){

    var voteChoiceId = Template.instance().currentVoteChoice.get();
    var upVote = Template.instance().currentVote.get();

    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {

      if (Template.instance().firstVote.get()) {

        Meteor.call('newUserVote', voteChoiceId, function (error, result) {
          if (error){
            console.log(error.reason);
          } else {
            //call update winning vote
            QV.updateWinners(voteChoiceId);
          };

        });

      } else {

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