Template.upDownVote.onCreated(function(){

  //set up a reactive variable for managing display of up/down vote buttons and collecting their vote count
  this.currentVote = new ReactiveVar("up");

});

Template.upDownVote.helpers({
  currentVote: function(){
    return Template.instance().currentVote.get();
  }

});

Template.upDownVote.events({

  "click .user-vote":function(){


    //user must be signed in to vote...
    if (Meteor.userId()) {
      var currentTemplate = Template.instance();
      var upDownVote = Template.instance().currentVote.get();
      var upVote;
      var nextVote;

      if(upDownVote === 'up'){
        upVote = true;
        nextVote = 'down';
      } else {
        upVote = false;
        nextVote = 'up';
      };

      var voteChoiceAttributes = {
        upVote:upVote,
        voteChoiceId: this._id
      }

      Meteor.call('updateVoteCount', voteChoiceAttributes, function (error, result) {
        if (error){
          console.log(error.reason);
        } else {
          currentTemplate.currentVote.set(nextVote);
        }

      });

    } else {
      // User is anonymous.  Authentication is required for this feature, so display a login prompt
       $('#loginModal').modal('show');
    };

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


    //   var previousVote = UserVotes.findOne({voteChoiceId: this._id, voterId: Meteor.userId()}) || false;

    //    if (previousVote){
    //      //if they have voted previously

    //      if(previousVote.upVote){
    //       //if their last vote was an upvote



  
       
    //   //wait to do until call result
    //   Template.instance().currentVote.set('down');
    // } else {
    //   Template.instance().currentVote.set('up');
    // };

    //       if (previousVote.upVote) {
            

    //         var upVote = false;

        


  // upDownVoteBtn:function(){
   

  //    //requirement: only allow one up or down vote

  //   // look for an existing vote by this user for this vote choice
  //   // set previousVote to false if not found
  //   var previousVote = UserVotes.findOne({voteChoiceId: this._id, voterId: Meteor.userId()}) || false;

  
    // if (current)




    // var currentVoteChoice = VoteChoices.findOne({_id: this._id });

    // //get the class of button that was clicked
    // var previousVote = UserVotes.findOne({voteChoiceId: this._id, voterId: Meteor.userId()}) || false;

    // // 1. update the vote count for this vote
    // var voteChoiceAttributes = {
    //   voteChoiceId: this._id


    // }

    // // 2. update upVote to true or false for this vote choice and user
    // } else {



    // var currentUserVote = UserVotes.findOne({voteChoice: currentVoteChoice });

      // if (currentUserVote) {
      //    console.log('already voted, so will be a downvote instead');

      // } else {

    //         var voteAttributes = {
    //   title: voteTitle
    // };

    // Meteor.call('createVote', voteAttributes, function(error, result){
    //   if (error){
    //     console.log(error.reason);
    //   } else {

    //      //clear out form data after insert
    //      template.find("form").reset();

    //   }
    // });

    // var userVoteAttributes = {
    //     voteChoiceId: this._id,
    //     upVote: true
    //   }

    //   Meteor.call('userUpvote', userVoteAttributes, function (error, result) {

    //     if (error){
    //       console.log(error.reason);
    //     } else {

    //     // update the display of the vote button
    //     return "down";

    //     }

    //   });

      // };