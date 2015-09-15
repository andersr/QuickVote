Votes = new Mongo.Collection('votes');

Meteor.methods({

  createVote:function(voteAttributes){

    check(Meteor.userId(), String);
    check(voteAttributes, {
      title: String
    });

    var userId = Meteor.userId();

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

  },

  openCloseVote: function(voteAttributes){
    check(Meteor.userId(), String);
    check(voteAttributes, {
      voteId: String,
      votingEnabled: Boolean
    });
 

    var vote = Votes.findOne({_id: voteAttributes.voteId });

    if(vote.owner === Meteor.userId()){

      Votes.upsert(voteAttributes.voteId, {
        $set: { 
          votingEnabled: voteAttributes.votingEnabled
        }
      });

    }
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