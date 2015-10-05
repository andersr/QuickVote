Template.upDownVote.onCreated(function(){
  var
  templateInstance                      = this;

  templateInstance.currentVoteChoiceId  = new ReactiveVar(templateInstance.data._id),
  templateInstance.firstVote            = new ReactiveVar(true),
  templateInstance.previousVote         = new ReactiveVar(false)
  ;

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {

        var firstVote = UserVotes.find({
          voteChoiceId:templateInstance.currentVoteChoiceId.get(),
          userId: Meteor.userId()
        }, {limit: 1}).count() === 0;
        templateInstance.firstVote.set(firstVote); 

        if (templateInstance.firstVote.get()) {
          templateInstance.previousVote.set(false);
        } else {
          var userVote = UserVotes.findOne({
            voteChoiceId:templateInstance.currentVoteChoiceId.get(),
            userId: Meteor.userId()
          });
          templateInstance.previousVote.set(userVote.upVote);      
        };
      };
    };
  });

});

Template.upDownVote.helpers({

  thumbIconToggle: function(){
    console.log("toggle: " + Template.instance().previousVote.get());

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

      var userVoteAttributes = {
        voteChoiceId: Template.instance().currentVoteChoiceId.get(),
        upVote: !Template.instance().previousVote.get()
      };

      if (Template.instance().firstVote.get()) {

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