Topics = new Mongo.Collection('topics');

Meteor.methods({

  addTopic:function(topicAttributes){

    check(Meteor.userId(), String);
    check(topicAttributes, {
      title: String
    });

    var userId = Meteor.userId();

    //uses underscore.js - install with "meteor add underscore"
    var topic = _.extend(topicAttributes, {
      topicAuthor: userId,
      updatedAt: new Date()
    });

    //when create a new document, mongo returns its id
    var topicId = Topics.insert(topic);

     //Associate a vote with this topic
    var voteId = Votes.insert({
      topicId: topicId,
      voteCount: 0
    });

    //return the id to the calling function (eg to allow for associating a vote with this topic)
    return {
     _id: topicId,
     voteId: voteId
    };

  },

  removeTopic:function(topicId){

    Topics.remove(topicId);

    //remove associated votes, to prevent orphan votes

    // this requires first finding the vote record using the topic id, and then removing it in separate step, because a removal requires direct reference of that record's id
    var relatedVote = Votes.findOne({ topicId:topicId });
    Votes.remove({ _id:relatedVote._id });

  }

});