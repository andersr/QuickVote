Template.voteMetaInfo.onCreated(function(){
  
  var instance = this;
  instance.subscriptionsReady    = new ReactiveVar(false);
  // console.log("params: " + Router.current().params._id);

  instance.autorun(function(){

    var voteId = Router.current().params._id;
    var votesSubscription = instance.subscribe('voteDetails', voteId);
    
    if (votesSubscription.ready()) {

      instance.voteDetails = function(){
         return Votes.findOne({_id: voteId });
      };
  
      instance.subscriptionsReady.set(true);
       // console.log("vote subscription is ready");

    } else {
      // console.log("vote subscription is not ready yet");
      instance.subscriptionsReady.set(false);
    };
  });
 
});


Template.voteMetaInfo.helpers({
  voteCreatorName: function () {

    if (Template.instance().subscriptionsReady.get()) {
      var vote = Template.instance().voteDetails();
    
      if (vote.owner === Meteor.userId()) {
        return "by you, ";
      } else {

        if (vote.ownerPublicName != "") {
         return "by " + vote.ownerPublicName + ", ";
        } else {
          return "";
        };
      };
    };
   
  },
  createdAtTimeAgo: function(){
    if (Template.instance().subscriptionsReady.get()) {
      var vote = Template.instance().voteDetails();
      var createdAt = vote.createdAt;
      return moment(createdAt).from(TimeSync.serverTime());
    };
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
