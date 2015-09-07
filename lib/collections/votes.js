Votes = new Mongo.Collection('votes');

Votes.helpers({
  owner: function() {
    //for the current vote, does owner match userId?

    
    // return Authors.findOne(this.authorId);
  }
});

Meteor.methods({

  createVote:function(voteAttributes){

    check(Meteor.userId(), String);
    check(voteAttributes, {
      title: String
    });

    var userId = Meteor.userId();

    //uses underscore.js - install with "meteor add underscore"
    var vote = _.extend(voteAttributes, {
      owner: userId,
      updatedAt: new Date(),
      votingEnabled: false
    });

    //when create a new document, mongo returns its id
    var voteId = Votes.insert(vote);

    //  //Associate a vote with this topic
    // var voteId = Votes.insert({
    //   topicId: topicId,
    //   voteCount: 0
    // });

    //return the id to the calling function (eg to allow for associating a vote with this topic)
    return {
     _id: voteId
     // ,
     // voteId: voteId
    };

  }
  // ,

  // removeVote:function(voteId){

  //   // Votes.remove(voteId);

  //   //first, remove associated vote choices (to prevent orphaned choices)

  //   // this requires first finding the vote record using the topic id, and then removing it in a separate step, because removal requires direct reference of that record's id
  //   // var voteChoicesForThisVote = VoteChoices.find({ voteId:voteId });

  //   //this will return an array of items

  //   // Votes.remove({ _id:relatedVote._id });

  //   // Votes.remove(voteId);

  // }

});