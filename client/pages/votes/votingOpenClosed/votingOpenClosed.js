Template.votingOpenClosed.helpers({
  voteStatus: function(){
    var currentVote = Vote.findOne({_id: this.params._id});
    return false;
  }
});