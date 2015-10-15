VoteChoices = new Mongo.Collection('voteChoices');

// from http://joshowens.me/meteor-security-101/

VoteChoices.allow({  
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

VoteChoices.deny({  
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});



Meteor.methods({

  addVoteChoice:function(voteChoiceAttributes){

    check(Meteor.userId(), String);
    check(voteChoiceAttributes, {
      title: String,
      voteId: String
    });

    var voteChoiceAttributes = _.extend(voteChoiceAttributes, {
      count:0,
      updatedAt: new Date()
    });

    var voteChoiceId = VoteChoices.insert(voteChoiceAttributes);

    var userVoteAttributes = {
      voteChoiceId: voteChoiceId
    };

    Meteor.call('addUserVote', userVoteAttributes, function (error, result) {
      if (error){
        console.log(error.reason);
      }
    });

    // return {
    //   voteChoiceId: voteChoiceId
    // };

  },
  
  removeVoteChoice:function(voteChoiceId){
    check(Meteor.userId(), String);
    check(voteChoiceId, String);
    VoteChoices.remove(voteChoiceId);
  },
  //REMOVE?
  increaseVoteChoiceCount:function(voteChoiceId){

    check(Meteor.userId(), String);
    check(voteChoiceId, String);

    var voteChoice = VoteChoices.findOne({
        _id: voteChoiceId 
    });

    VoteChoices.update(voteChoice._id, {
      $inc: { 
        count: 1
      }
    });
  },

  updateVoteChoiceVoteCount:function(voteChoiceAttributes){

    check(Meteor.userId(), String);
    check(voteChoiceAttributes, {
      voteChoiceId: String,
      upVote: Boolean
    });

    

    var voteChoice = VoteChoices.findOne({
        _id: voteChoiceAttributes.voteChoiceId 
    });

    if (voteChoiceAttributes.upVote) {

      VoteChoices.update(voteChoice._id, {
        $inc: { 
          count: 1
        }
      });

    } else {

      VoteChoices.update(voteChoice._id, {
        $inc: { 
          count: -1
        }
      });

    };

  }
  
});