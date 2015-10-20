Template.voteStatus.onCreated(function(){
  var
  templateInstance                 = this;

  templateInstance.votingEnabled   = new ReactiveVar(),
  templateInstance.votingInitiated = new ReactiveVar()
  ;

  templateInstance.autorun(function(){

    var votesSubscription = templateInstance.subscribe('votes');

    if (votesSubscription.ready()) {
      var vote = Votes.findOne({_id: Router.current().params._id });
          
      templateInstance.votingEnabled.set(vote.votingEnabled);
    
      templateInstance.votingInitiated.set(vote.votingInitiated);
     
      
    };
  });
});

Template.voteStatus.helpers({

  currentStatus: function(){

    var votingEnabled = Template.instance().votingEnabled.get();
    var votingInitiated = Template.instance().votingInitiated.get();

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