Template.upDownVote.onCreated(function(){

  this.isUpVote = new ReactiveVar();
  this.currentVoteChoiceId = new ReactiveVar(this.data._id);

  if(Meteor.userId()){

    var currentUserVote = UserVotes.findOne({voteChoiceId: this.data._id, voterId: Meteor.userId() });
      
    this.isUpVote.set(currentUserVote.upVote);

  } else {

    this.isUpVote.set(false);

  };

});

Template.upDownVote.helpers({

  currentVote: function(){

    return Template.instance().isUpVote.get()

  },

  thumbIconToggle: function(){

    if (Template.instance().isUpVote.get()) {
      return "thumbs-up";
    } else {
      return "thumbs-o-up";
    };

  },

  upDownVoteMsg: function(){

    if (Template.instance().isUpVote.get()) {
      return "Upvote this choice";
    } else {
      return "Undo your upvote";
    };
  }
  // , 

  // upDownVoteMsg: function(){

  //   if (Template.instance().isUpVote.get()) {
  //     return "Upvote this choice";
  //   } else {
  //     return "Undo your upvote";
  //   };
  // }, 


});

Template.upDownVote.events({

  "click .toggle-up-down-vote":function(event, template){
    var currentVote =  this.currentVote;
    template.currentVote.set(!currentVote);

    // if (!Meteor.userId()) {

    //    //user must be signed in to vote..
    //    console.log("please sign in to vote...");
    //    // $('#loginModal').modal('show');
    // } else {

    //   // console.log("vote choice id: " + Template.instance().currentVoteChoiceId.get());
    //   // console.log("Is upvote: " + Template.instance().isUpVote.get());
    //   // var upDownVote = Template.instance().isUpVote.get();
    
    //   var voteChoiceAttributes = {
    //     voteChoiceId: Template.instance().currentVoteChoiceId.get(),
    //     upVote: Template.instance().isUpVote.get()
    //   };

    //   var templateInstance = Template.instance();

    //   Meteor.call('updateVoteCount', voteChoiceAttributes, function (error, result) {

    //     if (error){
    //       console.log(error.reason);
    //     } else {
    //       // console.log(thisTemplate);
    //     }
    //     // else {

    //     //   // console.log('template instance: ' + templateInstance);
    //     //   // console.log('upvote result: ' + result.upVote);

    //     //   // templateInstance.isUpvote.set(result.upVote);
    //     // }
    //   });

      // Template.instance().isUpvote.set(!upDownVote);
      
    }
  // }
});

  


    // 1. update the vote count
    // 2. update this user's userVote

    // var currentTemplate = Template.instance();
    // var upDownVote = Template.instance().currentVote.get();
    // var upVote;
    // var nextVote;

    // if(upDownVote === 'up'){
    //   upVote = true;
    //   nextVote = 'down';
    // } else {
    //   upVote = false;
    //   nextVote = 'up';
    // };




    //   var voteChoiceAttributes = {
    //     upVote: this.isUpVote.get(),
    //     voteChoiceId: this.data._id
    //   }

    //   var voteChoiceAttributes = {
    //     upVote:upVote,
    //     voteChoiceId: this._id
    //   }

    //   Meteor.call('updateVoteCount', voteChoiceAttributes, function (error, result) {
    //     if (error){
    //       console.log(error.reason);
    //     } else {
    //       currentTemplate.currentVote.set(nextVote);
    //     }

    //   });

    // } else {

    // };

