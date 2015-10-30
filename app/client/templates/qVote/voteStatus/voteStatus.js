Template.voteStatus.onCreated(function(){
  var
  templateInstance  = this,
  voteId            = Router.current().params._id;

  templateInstance.voteStarted   = new ReactiveVar(),
  templateInstance.voteEnded = new ReactiveVar()
  ;

  templateInstance.autorun(function(){

    var votesSubscription = templateInstance.subscribe('voteDetails', voteId);

    if (votesSubscription.ready()) {
      var vote = Votes.findOne({_id: voteId });
      templateInstance.voteStarted.set(vote.voteStarted);
      templateInstance.voteEnded.set(vote.voteEnded);
    };
  });
});

Template.voteStatus.helpers({

  currentStatus: function(){

    var voteStarted = Template.instance().voteStarted.get();
    var voteEnded = Template.instance().voteEnded.get();

    if (!voteStarted) {

      return {
        message: "Voting hasn't started yet.",
        ownerAction: "Start this vote",
        classes: "btn btn-default start-vote no-underline"
      }

    } else if (voteStarted && !voteEnded){

      return {
        message: "Voting is currently in progress.",
        ownerAction: "End Voting",
        classes: "btn btn-default no-underline end-vote"
      }

    } else if (voteEnded){

      return {
        message: "Voting has ended.",
        ownerAction: "Re-open this vote",
        classes: "meta-info start-vote"
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
      } else{
        Session.set("addVoteChoice", false);
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
