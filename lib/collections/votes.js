Votes = new Mongo.Collection('votes');

Meteor.methods({

  createVote:function(voteAttributes){

    check(Meteor.userId(), String);
    check(voteAttributes, {
      title: String
    });

    // var userId = Meteor.userId();

    var voteAttributes = _.extend(voteAttributes, {
      owner: Meteor.userId(),
      updatedAt: new Date(),
      votingEnabled: false
    });

    //when create a new document, mongo returns its id
    var voteId = Votes.insert(voteAttributes);

    return {
      voteId:voteId
    }

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
});