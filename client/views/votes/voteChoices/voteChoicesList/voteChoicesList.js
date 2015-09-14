Template.voteChoicesList.helpers({
  // votingOpen: function(){

  //   // return Session.get("votingOpen"); 
  // },

  
  // votingOpen: function(){
  //   return Votes.findOne({_id: Router.current().params._id}).votingEnabled;
  //   //TODO: refactor using collection helpers
  //   // var currentVote = Votes.findOne({_id: Router.current().params._id});

  //   // if (currentVote.votingEnabled) {
  //   //   return true;
  //   // } else {
  //   //   return false; 
  //   // };

  // },

  voteChoices:function(){
    // var voteId = Router.current().params._id;

    return VoteChoices.find({voteId: Router.current().params._id }, {sort: {updatedAt: -1}});
    // return voteChoices;
    // VoteChoices.find({}, {sort: {updatedAt: -1}});
    // return Tasks.find({}, {sort: {createdAt: -1}});
  }
});

Template.voteChoicesList.events({
  // "click .delete-topic":function(e){
  //   e.preventDefault();

  //   var confirmDelete = confirm("Really delete this vote choice?");

  //   if(confirmDelete){
  //     Meteor.call('removeVoteChoice', this._id, function(error, result){
  //       if (error){
  //         console.log(error.reason);
  //       }
  //     });
  //   };
    
  // }
});