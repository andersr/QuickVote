Template.upDownVote.helpers({
  voteCount:function(){
    var thisVote = Votes.findOne({topicId: this._id});
    
    // only return if found - can be resolved with template level subscriptions
    if(thisVote){
      return thisVote.voteCount;
    }
 
  }
});

Template.upDownVote.events({
  "click .up-vote":function(){

    // get id of topic being voted on
    var topicId = this._id;

    // TODO: this is not DRY (same as in voteCount). Create a currentVote helper with a template level subscription and use whenever currentVote is needed
    var currentVote = Votes.findOne({topicId: this._id})

    Votes.update(
      { _id: currentVote._id},
      {$inc: { voteCount: 1 }}
    );


  },

  "click .down-vote":function(e){

    // get id of topic being voted on
    var topicId = this._id;

    var currentVote = Votes.findOne({topicId: this._id})

    Votes.update(
      { _id: currentVote._id},
      {$inc: { voteCount: -1 }}
    );

  }
});