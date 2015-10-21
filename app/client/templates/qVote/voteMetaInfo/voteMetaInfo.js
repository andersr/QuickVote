Template.voteMetaInfo.onCreated(function(){
  // var
  // templateInstance                      = this;
  // // var checkCreatedTimeAgo;
  // templateInstance.voteCreatedAt     = new ReactiveVar();

  // var createdAt = Votes.findOne({_id: Router.current().params._id }).createdAt;
    // console.log(createdAt);
    // var createdAtTimeAgo;

  // var checkCreatedAt = Meteor.setInterval(function() {
  //     Template.instance().voteCreatedAt.set(moment(createdAt).fromNow());
  //   }, 60000);

  // templateInstance.autorun(function(){

  //   var votesSubscription = templateInstance.subscribe('votes');

  //   if (votesSubscription.ready()) {
  //     var vote = Votes.findOne({_id: Router.current().params._id }); 

  //     // templateInstance.createdAtTimeAgo.set(moment(vote.createdAt).fromNow());
  //   };
  // });

    // checkCreatedTimeAgo = Meteor.setInterval(function() {
    //  Template.instance().createdAtTimeAgo.set(moment(vote.createdAt).fromNow());
    // }, 60000);

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
    var createdAt = Votes.findOne({_id: Router.current().params._id }).createdAt;
    return moment(createdAt).from(TimeSync.serverTime());

    // return Template.instance().voteCreatedAt.get();
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