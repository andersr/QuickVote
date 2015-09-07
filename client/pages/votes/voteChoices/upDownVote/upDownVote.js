Template.upDownVote.helpers({
  voteCount:function(){
    var thisVote = Votes.findOne({voteId: this._id});
    
    // required since we are not waiting for vote subscriptions to be ready.  TODO: resolve by adding a template level vote subscription
    if(thisVote){
      return thisVote.voteCount;
    }
 
  }
});

Template.upDownVote.events({

  //TODO: replace this with single component that contextually display an up or down button
  "click .up-vote":function(){

    if (Meteor.userId()) {
      console.log('ok to vote');
    } else {
      $('#myModal').modal('show');
    };

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