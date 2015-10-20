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
    var currentVote = Votes.findOne({_id: Router.current().params._id });
    var votingEnabled = currentVote.votingEnabled;
    var votingInitiated = currentVote.votingInitiated;


    if (!votingEnabled && !votingInitiated) { 

      return {
        message: "Voting hasn't started yet.",
        ownerAction: "Start this vote",
        classes: "btn btn-default start-vote"
      }

    } else if (votingEnabled && votingInitiated){

      return {
        message: "Voting is currently in progress.",
        ownerAction: "End Voting",
        classes: "btn btn-default end-vote"
      }

    } else if (!votingEnabled && votingInitiated){

      return {
        message: "Voting has ended.",
        ownerAction: "Re-open this vote",
        classes: "start-vote"
      }

    };

  }

});

Template.voteStatus.events({

  "click .start-vote":function(){
    var voteAttributes = {
      voteId: Router.current().params._id
    };
    Meteor.call('startVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      }
    });
  },

  "click .end-vote":function(){

    var voteAttributes = {
      voteId: Router.current().params._id
    };

    Meteor.call('endVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      }
    });
  }
});