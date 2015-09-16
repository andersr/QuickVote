Template.upDownVote.onCreated(function(){

  var templateInstance = this;
  // var currentVoteChoiceId = templateInstance.data._id;
  templateInstance.currentVoteChoice = new ReactiveVar(templateInstance.data._id);
  templateInstance.currentVote = new ReactiveVar(false);
  templateInstance.firstVote = new ReactiveVar(true);

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      // check if user has voted previously
      // if so, set currentVote to their most recent vote
      if (Meteor.userId()) {

        var userVote = UserVotes.findOne({
          voteChoiceId:templateInstance.currentVoteChoice.get(),
          voterId: Meteor.userId()
        });

        if (userVote != undefined) {
          templateInstance.currentVote.set(userVote.upVote);
          templateInstance.firstVote.set(false);
        } 

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

Template.upDownVote.events({

  "click .toggle-up-down-vote":function(){

    var voteChoiceId = Template.instance().currentVoteChoice.get();
    var upVote = Template.instance().currentVote.get();

    // if user is not signed in, ask to sign in before voting
    if (!Meteor.userId()) {
       console.log("please sign in to vote...");
       // $('#loginModal').modal('show');
    } else {

      //is this their first time voting on this vote choice?
      if (Template.instance().firstVote.get()) {

        Meteor.call('newUserVote', voteChoiceId, function (error, result) {

          if (error){
            console.log(error.reason);
          };

        });

      } else {

        console.log("not first vote...");

        var userVoteAttributes = {
          voteChoiceId: voteChoiceId,
          upVote: upVote
        };

        Meteor.call('toggleUpDownVote', userVoteAttributes, function (error, result) {

          if (error){
            console.log(error.reason);
          } else {
            console.log("toggleUpDownVote result: " + result.upVote);

              // var updatedCount = 0;

              // if (result.upVote) {
              //  updatedCount = 1;
              // } else {
              //  updatedCount = -1;
              // };

              var voteChoiceAttributes = {
                voteChoiceId: result.voteChoiceId,
                upVote: result.upVote
              };

              Meteor.call('updateVoteCount', voteChoiceAttributes, function (error, result) {

                if (error){
                  console.log(error.reason);
                } else {
                  console.log("added to vote count: " + result);
               }
             }); 
          }
        });
      };
    }
  }
});

// if upVote is true, send + 1 to voteCount, else send -1
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

