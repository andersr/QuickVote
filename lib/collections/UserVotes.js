UserVotes = new Mongo.Collection('userVotes');

Meteor.methods({

  newUserVote:function(voteChoiceId){

    check(Meteor.userId(), String);
    check(voteChoiceId, String);

    var userId = Meteor.userId();

    var userVote = UserVotes.insert({
      voteChoiceId: voteChoiceId,
      voterId: userId,
      upVote: true
    });

    var voteChoice = VoteChoices.findOne({
        _id: voteChoiceId 
    });

    VoteChoices.upsert(voteChoice._id, {
      $set: { 
        count: voteChoice.count + 1
      }
    });

    return {
      upVote: userVote.upVote,
      voteChoiceId: voteChoiceId
    };

  },
  toggleUpDownVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String,
      upVote: Boolean
    })
    // check(voteChoiceId, String);

    var userId = Meteor.userId();
    // var addToVoteCount = 0;

    var userVote = UserVotes.findOne({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      voterId: userId
    });

    UserVotes.upsert(userVote._id, {
       $set: { 
          upVote: !userVoteAttributes.upVote
       }
    });


    // console.log(userVoteAttributes.upVote);

    // if (userVoteAttributes.upVote) {
    //   addToVoteCount = 1;
    // } else {
    //   addToVoteCount = -1;
    // };

    // // //update vote count
    // var voteChoice = VoteChoices.findOne({
    //     _id: userVoteAttributes.voteChoiceId 
    // });

    // VoteChoices.upsert(voteChoice._id, {
    //   $set: { 
    //     count: voteChoice.count + addToVoteCount
    //   }
    // });

    // if(voteChoiceAttributes.upVote){



    // } else {

    //   VoteChoices.upsert(voteChoice._id, {
    //     $set: { 
    //       count: voteChoice.count-1
    //     }
    //   });
    // }
 
    return {
      upVote: userVote.upVote,
      voteChoiceId: userVoteAttributes.voteChoiceId
    }

  }
});

    // change to db.collection.find({_id: "myId"}, {_id: 1}).limit(1)

    // var firstVote = UserVotes.find({
    //   voteChoiceId: userVoteAttributes.voteChoiceId,
    //   voterId: Meteor.userId()
    // }.limit(1));

    // if(userVote.count() === 1) {

    //   UserVotes.upsert(userVote._id, {
    //     $set: { 
    //       upVote: !userVote.upVote
    //     }
    //   });
    // } else {

    //   UserVotes.insert(userVote._id, {
    //     $set: { 
    //       upVote: !userVote.upVote
    //     }
    //   });

    // }

// updateVoteCount:function(userVoteAttributes){

//     check(Meteor.userId(), String);
//     check(userVoteAttributes, {
//       upVote: Boolean
//     });

//     var voteChoice = VoteChoices.findOne({_id: voteAttributes.voteChoiceId });

//     if(userVoteAttributes.upVote){

//       VoteChoices.upsert(voteChoice._id, {
//         $set: { 
//           count: voteChoice.count+1
//         }
//       });

//     } else {

//       VoteChoices.upsert(voteChoice._id, {
//         $set: { 
//           count: voteChoice.count-1
//         }
//       });
//     }

//   }