Template.upDownVote.onCreated(function(){
  var
  templateInstance                      = this;

  templateInstance.currentVoteChoiceId  = new ReactiveVar(templateInstance.data._id),
  templateInstance.currentVoteId        = new ReactiveVar(templateInstance.data.voteId),
  templateInstance.votesByThisVoter     = new ReactiveVar(),
  templateInstance.firstOverallVote     = new ReactiveVar(),
  templateInstance.firstVote            = new ReactiveVar(true),
  templateInstance.previousVote         = new ReactiveVar(false)
  ;

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {

        var firstOverallVote = UserVotes.find({userId: Meteor.userId(), voteId: templateInstance.currentVoteId.get()}).count() === 0;

        templateInstance.firstOverallVote.set(firstOverallVote);

        var votesByThisVoter = UserVotes.find({userId: Meteor.userId(), voteId: templateInstance.currentVoteId.get()}).fetch();
             
        templateInstance.votesByThisVoter.set(votesByThisVoter);      

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
    // console.log("toggle: " + Template.instance().previousVote.get());

    if (Template.instance().previousVote.get()) {
      return "fa fa-thumbs-up";
    } else {
      return "fa fa-thumbs-o-up";
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
      return;
    };

    // is this the current user's first overall vote for this vote?
    if (Template.instance().firstOverallVote.get()) {

      QV.userVoteUpVote({
        voteChoiceId: Template.instance().currentVoteChoiceId.get(),
        firstVote:    true
      });

      // otherwise, is the current vote already an upvote? THIS MAY BE THE ISSUE
    } else if (Template.instance().previousVote.get() === true) {

      // then downVote this vote
      QV.userVoteDownVote({
        voteChoiceId: Template.instance().currentVoteChoiceId.get(),
        firstVote:    false
      });


  } else {

    //upvote this vote
    QV.userVoteUpVote({
      voteChoiceId: Template.instance().currentVoteChoiceId.get(),
      firstVote:    Template.instance().firstVote.get()
    });

    // look for other upVotes and downvote them
    var votesByThisVoter = Template.instance().votesByThisVoter.get();
    votesByThisVoter.forEach(function (userVote) {
      if (userVote.voteChoiceId != Template.instance().currentVoteChoiceId.get() && userVote.upVote){
        QV.userVoteDownVote({
          voteChoiceId: userVote.voteChoiceId,
          firstVote:    false
        });
      };
    });

  };

  }
});