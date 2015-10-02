Votes = new Mongo.Collection('votes');

// from http://joshowens.me/meteor-security-101/

Votes.allow({  
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  }
});
// deny anyone that tries to update the document userId:

Votes.deny({  
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});


Meteor.methods({

  createVote:function(voteAttributes){

    check(Meteor.userId(), String);
    check(voteAttributes, {
      title: String
    });

    var voteAttributes = _.extend(voteAttributes, {
      owner: Meteor.userId(),
      updatedAt: new Date(),
      votingEnabled: false,
      hasWinner:false,
      winningCount: 0,
      winningChoices:[]
    });

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
  },
  
  updateWinners: function(voteAttributes){
    check(Meteor.userId(), String);
    check(voteAttributes, {
      voteId: String,
      voteChoiceId: String
    });
 
    var vote = Votes.findOne({_id: voteAttributes.voteId });

    if (vote.winningCount > 0) {

        if (voteChoice.count === currentVote.winningCount) {
          Votes.update(currentVote._id, {
            $push: { 
              winningChoices: voteChoice._id
            }
          });
        } else if (voteChoice.count > currentVote.winningCount) {
           Votes.update(currentVote._id, {
            $set: { 
              winningChoices: [voteChoice._id],
              winningCount: voteChoice.count,
              hasWinner:true
            }
          });       
        };
      // TODO: check if winningCount came down:
      // separate check: if the vote count is less than the winning count
      // are there any winningVotes?
      // if none
      // what is next highest voteCount?
      // if none - hasWinner false

    } else {
      Votes.update(currentVote._id, {
        $set: { 
          hasWinner:false
        }
      }); 
    };

    if(vote.owner === Meteor.userId()){

      Votes.upsert(voteAttributes.voteId, {
        $set: { 
          votingEnabled: voteAttributes.votingEnabled
        }
      });

    }
  },

  deleteVote:function(voteId){

    check(Meteor.userId(), String);
    check(voteId, String);

    VoteChoices.find({voteId: voteId}).forEach(function (doc) {
      Meteor.call('removeVoteChoice', doc._id, function(error, result){
        if (error){
          console.log(error.reason);
        }
      });
    });

    UserVotes.find({voteId: voteId}).forEach(function (doc) {
      Meteor.call('removeUserVote', doc._id, function(error, result){
        if (error){
          console.log(error.reason);
        }
      });
    });

    Votes.remove({_id: voteId});

  }

});