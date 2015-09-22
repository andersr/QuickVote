Template.deleteVote.onCreated(function(){

  // var templateInstance = this;

  this.voteId = new ReactiveVar(this.data._id);

  // console.log(this.data._id);

  // templateInstance.autorun(function(){
  //   templateInstance.voteId.set(templateInstance.data._id);
  // });

});

// Template.deleteVote.helpers({
//   deleteVoteMsg
// });

Template.deleteVote.events({
  "click .delete-vote":function(){

    var voteId = Template.instance().voteId.get();
    var deleteVote = confirm("Really delete this vote?");

    if(deleteVote){

      VoteChoices.find({voteId: voteId}).forEach(function (doc) {
          Meteor.call('removeVoteChoice', doc._id, function(error, result){
            if (error){
              console.log(error.reason);
            }
          });
      });

      UserVotes.find({voteId: voteId}).forEach(function (doc) {
          Meteor.call('removeVoteChoice', doc._id, function(error, result){
            if (error){
              console.log(error.reason);
            }
          });
      });

      Meteor.call('deleteVote', voteId, function(error, result){
        if (error){
          console.log(error.reason);
        } else {

          sAlert.info("Vote deleted.");

        }
      });

    }; 
  }

});
