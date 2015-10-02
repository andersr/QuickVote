Template.upDownVote.onCreated(function(){
  var templateInstance = this;
  templateInstance.currentVoteChoiceId = new ReactiveVar(templateInstance.data._id);

  templateInstance.firstVote = new ReactiveVar(true);
  templateInstance.currentVote = new ReactiveVar(false);

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {
        var userVote = UserVotes.findOne({
          voteChoiceId:templateInstance.currentVoteChoiceId.get(),
          voterId: Meteor.userId()
        });

        if (userVote != undefined) {
          templateInstance.firstVote.set(false);
          templateInstance.currentVote.set(userVote.upVote);
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

    if (!Meteor.userId()) {

      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');

    } else {

      var currentVoteChoice = VoteChoices.findOne({_id: Template.instance().currentVoteChoiceId.get()});

      var userVoteAttributes = {
        voteChoiceId: Template.instance().currentVoteChoiceId.get()
      };

      if (Template.instance().firstVote.get()) {

        _.extend(userVoteAttributes, { 
          upVote: true,
          voteId: currentVoteChoice.voteId
        });

        Meteor.call('newUserVote', userVoteAttributes, function (error, result) {
          if (error){
            console.log(error.reason);
          } else {
            // QV.updateWinners(userVoteAttributes.voteChoiceId);
          };
        });
 

      } else {

        _.extend(userVoteAttributes, {
          upVote: !Template.instance().currentVote.get()
        });

        Meteor.call('toggleUpDownVote', userVoteAttributes, function (error, result) {
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