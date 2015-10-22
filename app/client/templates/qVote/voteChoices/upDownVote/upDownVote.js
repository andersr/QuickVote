Template.upDownVote.onCreated(function(){
  var
  templateInstance                      = this;

  templateInstance.currentVoteChoiceId  = new ReactiveVar(templateInstance.data._id),
  templateInstance.currentVoteId        = new ReactiveVar(templateInstance.data.voteId),
  templateInstance.votesByThisVoter     = new ReactiveVar(),
  templateInstance.firstOverallVote     = new ReactiveVar(),
  templateInstance.firstVote            = new ReactiveVar(true),
  templateInstance.previousVote         = new ReactiveVar(false)
  ;

  templateInstance.autorun(function(){

    var userVotesSubscription = templateInstance.subscribe('userVotes');

    if (userVotesSubscription.ready()) {

      if (Meteor.userId()) {

        var firstOverallVote = UserVotes.find({userId: Meteor.userId(), voteId: templateInstance.currentVoteId.get()}).count() === 0;

        templateInstance.firstOverallVote.set(firstOverallVote);

        var votesByThisVoter = UserVotes.find({userId: Meteor.userId(), voteId: templateInstance.currentVoteId.get()}).fetch();
             
        templateInstance.votesByThisVoter.set(votesByThisVoter);      

        var firstVote = UserVotes.find({
          voteChoiceId:templateInstance.currentVoteChoiceId.get(),
          userId: Meteor.userId()
        }, {limit: 1}).count() === 0;
        templateInstance.firstVote.set(firstVote); 

        if (templateInstance.firstVote.get()) {
          templateInstance.previousVote.set(false);
        } else {
          var userVote = UserVotes.findOne({
            voteChoiceId:templateInstance.currentVoteChoiceId.get(),
            userId: Meteor.userId()
          });
          templateInstance.previousVote.set(userVote.upVote);      
        };
      };
    };
  });

});

Template.upDownVote.helpers({

  thumbIconToggle: function(){
    // console.log("toggle: " + Template.instance().previousVote.get());

    if (Template.instance().previousVote.get()) {
      return "fa fa-thumbs-up";
    } else {
      return "fa fa-thumbs-o-up";
    };
  },

  upDownVoteMsg: function(){
    if (Template.instance().previousVote.get()) {
      return "Undo your upvote";
    } else {
      return "Upvote this choice";
    };
  }

});

Template.upDownVote.events({

  "click .toggle-up-down-vote":function(){

    if (!Meteor.userId()) {
      Session.set("loginViaModal", true);
      $('#loginModal').modal('show');
    } else {

      if (Template.instance().firstOverallVote.get()) {

        // update this userVote to be an upVote
        Meteor.call('userVoteUpDownVote',
          {
            voteChoiceId: Template.instance().currentVoteChoiceId.get(),
            upVote:       true,
            firstVote:    true
          },
          function (error, result) {
            if (error){
              console.log(error.reason);
            }; 
          }
        );

      } else {

      var votesByThisVoter = Template.instance().votesByThisVoter.get();
      // console.log("votesByThisVoter: " + votesByThisVoter);

      votesByThisVoter.forEach(function (userVote) {

        // for the current vote choice...
        if (userVote.voteChoiceId === Template.instance().currentVoteChoiceId.get()){

           // if it is currently an upvote
           if (userVote.upVote){

             // update this userVote to be a downVote
             Meteor.call('userVoteUpDownVote', {
                voteChoiceId: userVote.voteChoiceId,
                upVote: false,
                firstVote: false
              }, function (error, result) {
                  if (error){
                    console.log(error.reason);
                  }; 
                }
             );

           } else {

            // update this userVote to be an upVote
            Meteor.call('userVoteUpDownVote',
              {
                voteChoiceId: userVote.voteChoiceId,
                upVote:       true,
                firstVote:    Template.instance().firstVote.get()
              },
              function (error, result) {
                if (error){
                  console.log(error.reason);
                }; 
              }
            );

          };


        } else {

          // downVote all other userVotes
          Meteor.call('userVoteUpDownVote',
            {
              voteChoiceId: userVote.voteChoiceId,
              upVote:       false,
              firstVote:    false
            },
            function (error, result) {
              if (error){
                console.log(error.reason);
              }; 
            }
          );
        };
      }); 
    };
  };
  }
});


      // var thisVote = Template.instance().firstVote.get()? true : !Template.instance().previousVote.get();

      // var userVoteAttributes = {
      //   voteChoiceId: Template.instance().currentVoteChoiceId.get(),
      //   upVote:       thisVote,
      //   firstVote:      Template.instance().firstVote.get()
      // };

      // Meteor.call('userVoteUpDownVote', userVoteAttributes, function (error, result) {
      //   if (error){
      //     console.log(error.reason);
      //   };
      // });