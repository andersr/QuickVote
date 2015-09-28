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
  deleteVote:function(voteId){

    check(Meteor.userId(), String);
    check(voteId, String);

   //  Posts.before.insert(function (userId, doc) {
   //  doc.createdAt = Date.now();
   // });
    // Contests.after.remove(function (userId, contest) {
    //    Entries.remove({ contest_id: contest._id });
    //    Questions.remove({ contest_id: contest._id });
    //    Answers.remove({ contest_id: contest._id });
    // });

   //  Votes.after.remove(function (voteId, vote) {

   //    UserVotes.find({voteId: vote._id}).forEach(function (userVotesDoc) {
   //      VoteChoices.remove(userVotesDoc._id);
   //    }); 

   //   VoteChoices.find({voteId: doc._id}).forEach(function (voteChoicesDoc) {
   //     VoteChoices.remove(voteChoicesDoc._id);
   //   });

   // });
 }

});