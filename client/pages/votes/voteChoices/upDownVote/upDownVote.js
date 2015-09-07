Template.upDownVote.helpers({
  upDownVoteBtn:function(){
   
    // look for an existing vote by this user for this vote choice, and set alreadyVoted to false if not found
    var alreadyVoted = UserVotes.findOne({voteChoiceId: this._id, voterId: Meteor.userId()}) || false;

    if (alreadyVoted) {

      //this user has previously voted for this vote choice

      //if their most recent vote was an upvote
      if (alreadyVoted.upVote) {
        
        // display a downvote button
        return "down";

      } else {

        //their last vote was a downvote, therefore display an up button
        return "up";
      }

    } else {
      // the user was not found (and therefore has never voted)
      // display the default upvote button
      return "up";
    };
  
  }
});

Template.upDownVote.events({

  "click .user-vote":function(){

    if (Meteor.userId()) {
      // console.log('ok to vote on this: ' + currentUserVote);

    var currentVoteChoice = VoteChoices.findOne({_id: this._id });
    var previousVote = UserVotes.findOne({voteChoiceId: this._id, voterId: Meteor.userId()}) || false;

    // 1. update the vote count for this vote
    // 2. update upVote to true or false for this vote choice and user

    // var currentUserVote = UserVotes.findOne({voteChoice: currentVoteChoice });

      if (currentUserVote) {
         console.log('already voted, so will be a downvote instead');

      } else {

    //         var voteAttributes = {
    //   title: voteTitle
    // };

    // Meteor.call('createVote', voteAttributes, function(error, result){
    //   if (error){
    //     console.log(error.reason);
    //   } else {

    //      //clear out form data after insert
    //      template.find("form").reset();

    //   }
    // });

    // var userVoteAttributes = {
    //     voteChoiceId: this._id,
    //     upVote: true
    //   }

    //   Meteor.call('userUpvote', userVoteAttributes, function (error, result) {

    //     if (error){
    //       console.log(error.reason);
    //     } else {

    //     // update the display of the vote button
    //     return "down";

    //     }

    //   });

      };

    } else {
      $('#loginModal').modal('show');
    };



  },

  "click .down-vote":function(e){

    // get id of topic being voted on
    var voteId = this._id;

    var currentVote = Votes.findOne({voteId: this._id})

    Votes.update(
      { _id: currentVote._id},
      {$inc: { voteCount: -1 }}
    );

  }
});