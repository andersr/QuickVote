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
      count:0,
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

  }, 
  updateVoteCount:function(voteChoiceAttributes){

    check(Meteor.userId(), String);
    check(voteChoiceAttributes, {
      upVote: Boolean
    });

    var voteChoice = VoteChoices.findOne({_id: voteAttributes.voteChoiceId });

    if(voteChoiceAttributes.upVote){

      VoteChoices.upsert(voteChoice._id, {
        $set: { 
          count: voteChoice.count+1
        }
      });

    } else {

      VoteChoices.upsert(voteChoice._id, {
        $set: { 
          count: voteChoice.count-1
        }
      });
    }
    
  }
});

 

    // if(vote.owner === Meteor.userId()){

    //   Votes.upsert(voteAttributes.voteId, {
    //     $set: { 
    //       votingEnabled: voteAttributes.votingEnabled
    //     }
    //   });

    // }