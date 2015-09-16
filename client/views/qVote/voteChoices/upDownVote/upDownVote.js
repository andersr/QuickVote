Template.upDownVote.onCreated(function(){

  var templateInstance = this;
  var currentVoteChoiceId = templateInstance.data._id;

  templateInstance.currentVote = new ReactiveVar(false);

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {

        var lastVote = UserVotes.findOne({
          voteChoiceId:currentVoteChoiceId,
          voterId: Meteor.userId()
        }).upVote || false;

        console.log("last vote: " + lastVote);

        templateInstance.currentVote.set(lastVote);
      };
    };
  });

});

Template.upDownVote.helpers({

  thumbIconToggle: function(){
    if (Template.instance().currentVote.get()) {
      return "thumbs-up";
    } else {
      return "thumbs-o-up";
    };
  },

  upDownVoteMsg: function(){
    if (Template.instance().currentVote.get()) {
      return "Upvote this choice";
    } else {
      return "Undo your upvote";
    };
  }

});


//   var foo = this;

//   foo.autorun(function(){
//     foo.subscribe('userVotes');

//     // if (subscription.ready()) {
//     //   // instance.userVote = UserVotes.findOne({voteChoiceId: this.currentVoteChoiceId});
//     //   // instance.voteToggle.set(currentUserVote.upVote);
//     //   // var userVote = UserVotes.findOne({}, {limit:1});
//     //   instance.firstVote.set(false);
//     //   // console.log("current vote: " + instance.voteToggle.get());
//     //   // console.log("current vote: " + currentUserVote.upVote);
     
//     // } else {
//     //    instance.voteToggle.set(false);
//     //    instance.firstVote.set(true);
//     //    console.log("subscription not ready");
//     // }
//   });



//   foo.voteToggle = new ReactiveVar();
//   // instance.firstVote = new ReactiveVar(true);
//   // console.log(this.currentVoteChoiceId);


//   // 3. Cursor

//   instance.userVotes = function() { 
//     return UserVotes.find({});
//   }

//   console.log(Template.instance().userVotes)


// });



// Template.upDownVote.events({

//   "click .toggle-up-down-vote":function(){

//     var voteChoiceId = this.currentVoteChoiceId;
//     // console.log("current vote choice: " + currentVoteChoiceId);

//     //if user is not signed in, ask to sign in before voting
//     if (!Meteor.userId()) {
//        console.log("please sign in to vote...");
//        // $('#loginModal').modal('show');
//     } else {

//       //is this their first time voting on this?
//       if (Template.instance().firstVote.get()) {

//         // var userVoteAttributes = {
//         //   voteChoiceId: currentVoteChoiceId
//         // };

//         Meteor.call('newUserVote', voteChoiceId, function (error, result) {

//           if (error){
//             console.log(error.reason);
//           } else {
//             console.log("newUserVote result: " + result);
//           }
//         });

//       } else {

//         Meteor.call('toggleUpDownVote', voteChoiceId, function (error, result) {

//           if (error){
//             console.log(error.reason);
//           } else {
//             console.log("toggleUpDownVote result: " + result);
//           }
//         });
//       };
//     }
//   }
// });

//     // };

//     //   // console.log("vote choice id: " + Template.instance().currentVoteChoiceId.get());
//     //   // console.log("Is upvote: " + Template.instance().isUpVote.get());
//     //   // var upDownVote = Template.instance().isUpVote.get();
    
   
//     //   var templateInstance = Template.instance();

//     //   Meteor.call('updateVoteCount', voteChoiceAttributes, function (error, result) {

//     //     if (error){
//     //       console.log(error.reason);
//     //     } else {
//     //       // console.log(thisTemplate);
//     //     }
//     //     // else {

//     //     //   // console.log('template instance: ' + templateInstance);
//     //     //   // console.log('upvote result: ' + result.upVote);

//     //     //   // templateInstance.isUpvote.set(result.upVote);
//     //     // }
//     //   });

//       // Template.instance().isUpvote.set(!upDownVote);
      


//     //subscribe to userVotes

//   // this.isUpVote = new ReactiveVar();
//   // this.currentVoteChoiceId = new ReactiveVar(this.data._id);

//   // if(Meteor.userId()){

//   //   var currentUserVote = UserVotes.findOne({voteChoiceId: this.data._id, voterId: Meteor.userId() });
      
//   //   this.isUpVote.set(currentUserVote.upVote);

//   // } else {

//   //   this.isUpVote.set(false);

//   // };


//     // 1. update the vote count
//     // 2. update this user's userVote

//     // var currentTemplate = Template.instance();
//     // var upDownVote = Template.instance().currentVote.get();
//     // var upVote;
//     // var nextVote;

//     // if(upDownVote === 'up'){
//     //   upVote = true;
//     //   nextVote = 'down';
//     // } else {
//     //   upVote = false;
//     //   nextVote = 'up';
//     // };




//     //   var voteChoiceAttributes = {
//     //     upVote: this.isUpVote.get(),
//     //     voteChoiceId: this.data._id
//     //   }

//     //   var voteChoiceAttributes = {
//     //     upVote:upVote,
//     //     voteChoiceId: this._id
//     //   }

//     //   Meteor.call('updateVoteCount', voteChoiceAttributes, function (error, result) {
//     //     if (error){
//     //       console.log(error.reason);
//     //     } else {
//     //       currentTemplate.currentVote.set(nextVote);
//     //     }

//     //   });

//     // } else {

//     // };

