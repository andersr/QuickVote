Template.upDownVote.helpers({
  upDownVoteBtn:function(){
    return "up";

    //if this user has already vote on this item, return down, else up

  }
});

Template.upDownVote.events({

  //TODO: replace this with single component that contextually display an up or down button
  "click .up-vote":function(){
    var currentVoteChoice = VoteChoices.findOne({_id: this._id });
    // var currentUserVote = UserVotes.findOne({voteChoice: currentVoteChoice });

    if (Meteor.userId()) {
      console.log('ok to vote on this: ' + currentUserVote);

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

      };

    } else {
      $('#loginModal').modal('show');
    };


//after login, want to do: $('#loginModal').modal('hide');
//on open of modal, set logging in to true, then if logginIn is true and meteor.userId is true, close modal
    // // get id of topic being voted on
    // var voteId = this._id;

    // // TODO: this is not DRY (same as in voteCount). Create a currentVote helper with a template level subscription and use whenever currentVote is needed
    // var currentVoteChoice = Votes.findOne({voteId: this._id})

    // Votes.update(
    //   { _id: currentVote._id},
    //   {$inc: { voteCount: 1 }}
    // );
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