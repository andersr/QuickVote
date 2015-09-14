VoteChoices = new Mongo.Collection('voteChoices');

Meteor.methods({

  addVoteChoice:function(voteChoiceAttributes){

    check(Meteor.userId(), String);
    check(voteChoiceAttributes, {
      title: String,
      voteId: String
    });

    var userId = Meteor.userId();

    var voteChoice = _.extend(voteChoiceAttributes, {
      count:0,
      updatedAt: new Date()
    });

    var voteChoiceId = VoteChoices.insert(voteChoice);

    return {
     _id: voteChoiceId
    };

  }, 
  updateVoteCount:function(voteChoiceAttributes){

    check(Meteor.userId(), String);
    check(voteChoiceAttributes, {
      voteChoiceId: String,
      upVote: Boolean
    });

    var voteChoice = VoteChoices.findOne({_id: voteChoiceAttributes.voteChoiceId });

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