Template.voteMetaInfo.onCreated(function(){
  var
  templateInstance                      = this;
  templateInstance.createdAtTimeAgo     = new ReactiveVar();

  templateInstance.autorun(function(){

    var votesSubscription = templateInstance.subscribe('votes');

    if (votesSubscription.ready()) {
      var vote = Votes.findOne({_id: Router.current().params._id });      
      templateInstance.createdAtTimeAgo.set(moment(vote.createdAt).fromNow());
    };
  });

});
Template.voteMetaInfo.helpers({
  voteCreatorName: function () {
    var vote = Votes.findOne({_id: Router.current().params._id });
    
    if (vote.owner === Meteor.userId()) {
      return "you";
    } else {
      return vote.ownerPublicName;
    };
    
  },
  createdAtTimeAgo: function(){
    return Template.instance().createdAtTimeAgo.get();
  }
});

Template.voteMetaInfo.events({
  "submit .new-vote-form": function(event,template){
    // console.log("submitted new vote");
    event.preventDefault();

    var voteTitle = event.target.voteTitle.value;

    var voteAttributes = {
      title: voteTitle
    };

    Meteor.call('createVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } else {
        Session.set("newVote", false);
        Router.go('voteDetail', { _id: result.voteId });
        Session.set("addVoteChoice", true);
      }
    });
  }
  ,
  "keyup input": function(e,t){
    e.preventDefault();

    if (e.keyCode == 27){
      Session.set("newVote", false);
    };
    e.stopPropagation();

  }
});