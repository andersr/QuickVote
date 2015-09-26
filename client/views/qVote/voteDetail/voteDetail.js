Template.voteDetail.onCreated(function(){
  // var templateInstance = this;
  // var currentVoteId = Router.current().params._id;
  // var totalVotes;
  // var highestCountVoteChoices;
 
  // templateInstance.autorun(function(){

  //   var voteChoicesSubscription = templateInstance.subscribe('voteChoices');

  //   if (voteChoicesSubscription.ready()) {

    
  //     totalVotes = VoteChoices.find({voteId: currentVoteId }).sum('count');

  //     //looking at count for each, what is highest count value?
  //     highestCountVoteChoices = VoteChoices.findOne({voteId: currentVoteId }, {sort: { count: -1 }}).fetch();
      






  //    // console.log("total votes: " + highestCountVoteChoices);

  //     // totalVotes = UserVotes.find({voteId: currentVoteId }, {sort: { updatedAt: -1 }});


  //     // if (Meteor.userId()) {
  //     //   var userVote = UserVotes.findOne({
  //     //     voteChoiceId:templateInstance.currentVoteChoice.get(),
  //     //     voterId: Meteor.userId()
  //     //   });

  //     //   if (userVote != undefined) {
  //     //     templateInstance.currentVote.set(userVote.upVote);
  //     //     templateInstance.firstVote.set(false);
  //     //   };

  //     // } else {
  //     //   templateInstance.firstVote.set(true);
  //     //   templateInstance.currentVote.set(false);
  //     // };
  //   };
  // });



});

Template.voteDetail.helpers({
  
  voteChoices:function(){
    return VoteChoices.find({voteId: Router.current().params._id }, {sort: { updatedAt: -1 }});
  },
  hasWinner: function(){


    //if voting is closed
    //if this vote has userVotes
    // display vote choice with most votes and declare the winner
    // else display voting is closed.
  }
});

Template.voteDetail.events({

  "submit .vote-title-form": function(event,template){
    event.preventDefault();
    var voteTitle = event.target.voteTitle.value;
    var voteAttributes = {
      title: voteTitle
    };

    Meteor.call('createVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } else {
         template.find("form").reset();
      }
    });
  }

});
