VoteChoices = new Mongo.Collection('voteChoices');

Meteor.methods({

  addVoteChoice:function(voteChoiceAttributes){

    check(Meteor.userId(), String);
    check(voteChoiceAttributes, {
      title: String,
      voteId: String
    });

    var userId = Meteor.userId();

    //uses underscore.js - install with "meteor add underscore"
    var voteChoice = _.extend(voteChoiceAttributes, {
      updatedAt: new Date()
    });

    //when create a new document, mongo returns its id
    var voteChoiceId = VoteChoices.insert(voteChoice);

    //return the id to the calling function (eg to allow for associating a vote with this topic)
    return {
     _id: voteChoiceId
     // ,
     // voteId: voteId
    };

  }
});