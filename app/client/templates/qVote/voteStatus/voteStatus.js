Template.voteStatus.onCreated(function(){
  // var
  // templateInstance                 = this;

  // templateInstance.currentVote     = new ReactiveVar(),
  // templateInstance.votingEnabled   = new ReactiveVar(),
  // templateInstance.votingInitiated = new ReactiveVar(false)
  // ;

  // templateInstance.autorun(function(){

  //   var votesSubscription = templateInstance.subscribe('votes');

  //   if (votesSubscription.ready()) {
  //     // templateInstance.currentVote.set()

  //     if (Meteor.userId()) {

  //       var firstVote = UserVotes.find({
  //         voteChoiceId:templateInstance.currentVoteChoiceId.get(),
  //         userId: Meteor.userId()
  //       }, {limit: 1}).count() === 0;
  //       templateInstance.firstVote.set(firstVote); 

  //       if (templateInstance.firstVote.get()) {
  //         templateInstance.previousVote.set(false);
  //       } else {
  //         var userVote = UserVotes.findOne({
  //           voteChoiceId:templateInstance.currentVoteChoiceId.get(),
  //           userId: Meteor.userId()
  //         });
  //         templateInstance.previousVote.set(userVote.upVote);      
  //       };
  //     };
  //   };
  // });

});

Template.voteStatus.helpers({

  currentStatus: function(){
    var currentVote = Votes.find({_id: Router.current().params._id });
    var currentStatus = currentVote.votingInitiated;

    return currentStatus? "Voting is currently in progress." : "Voting hasn't started yet.";

  }
  ,

  ownerActions: function(){

    return {
      label: "Start this vote",
      action: "foo"
    }

  }

});

Template.upDownVote.events({

  "click .toggle-up-down-vote":function(){

    if (!Meteor.userId()) {

      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');

    } else {

      var thisVote = Template.instance().firstVote.get()? true : !Template.instance().previousVote.get();

      var userVoteAttributes = {
        voteChoiceId: Template.instance().currentVoteChoiceId.get(),
        upVote:       thisVote,
        firstVote:      Template.instance().firstVote.get()
      };

      Meteor.call('userVoteUpDownVote', userVoteAttributes, function (error, result) {
        if (error){
          console.log(error.reason);
        };
      });

    };

  }
});