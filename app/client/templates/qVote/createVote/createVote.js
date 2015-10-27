Template.createVote.onRendered(function(){
  $( "#voteTitle" ).focus();
});

Template.createVote.events({

  'submit .new-vote-form': function(event) {
    event.preventDefault();
     if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
     };

    var $input = $(event.target).find('[type=text]');
    if (! $input.val())
      return;

     // console.log("text input: " + $input.val());

      var voteAttributes = {
        title: $input.val()
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

    $input.val('');
  }

  //   "keyup input": function(event,template){
  //     event.preventDefault();
  //   // console.log("submitted new vote");
  //   if (event.keyCode === 13){
  //     console.log("return key was pressed ");
  //     var voteTitle = document.getElementById('voteTitle').value;
  //     console.log("vote title: " + voteTitle);
  //   }
  // }
});
    //   var voteAttributes = {
    //     title: voteTitle
    //   };

    // Meteor.call('createVote', voteAttributes, function(error, result){
    //   if (error){
    //     console.log(error.reason);
    //   } else {
    //     Session.set("newVote", false);
    //     Router.go('voteDetail', { _id: result.voteId });
    //     Session.set("addVoteChoice", true);
    //   }
    // });

  

    //check again for meteor user id

    // if (!Meteor.userId()) {
    //   Session.set("loginViaModal", true);
    //   $('#loginModal').modal('show');
    // } else {

    //   var voteTitle = event.target.voteTitle.value;

    //   var voteAttributes = {
    //     title: voteTitle
    //   };

    // Meteor.call('createVote', voteAttributes, function(error, result){
    //   if (error){
    //     console.log(error.reason);
    //   } else {
    //     Session.set("newVote", false);
    //     Router.go('voteDetail', { _id: result.voteId });
    //     Session.set("addVoteChoice", true);
    //   }
    // });

    // };    

  // "submit #createVote": function(event,template){
  //   // console.log("submitted new vote");
  //   event.preventDefault();

  //   //check again for meteor user id

  //   if (!Meteor.userId()) {
  //     Session.set("loginViaModal", true);
  //     $('#loginModal').modal('show');
  //   } else {

  //     var voteTitle = event.target.voteTitle.value;

  //     var voteAttributes = {
  //       title: voteTitle
  //     };

  //   Meteor.call('createVote', voteAttributes, function(error, result){
  //     if (error){
  //       console.log(error.reason);
  //     } else {
  //       Session.set("newVote", false);
  //       Router.go('voteDetail', { _id: result.voteId });
  //       Session.set("addVoteChoice", true);
  //     }
  //   });

  //   };    
  // },
  // "keyup #voteTitle": function(e){
  //   if (e.keyCode === 13){
  //      if (!Meteor.userId()) {
  //         Session.set("loginViaModal", true);
  //         $('#loginModal').modal('show');
  //       }
  //   }
  // },


  // "keyup input": function(e,t){
  //   e.preventDefault();

  //   if (e.keyCode == 27){
  //     Session.set("newVote", false);
  //   };
  //   e.stopPropagation();

  // }
