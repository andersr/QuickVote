UserVotes = new Mongo.Collection('userVotes');

Meteor.methods({

  addUserVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String
    });

    var userVoteAttributes = _.extend(userVoteAttributes, {
      voterId:Meteor.userId(),
      upVote:false
    });

    UserVotes.insert(userVoteAttributes);

  },
  toggleUpDownVote:function(userVoteAttributes){

    check(Meteor.userId(), String);
    check(userVoteAttributes, {
      voteChoiceId: String, 
      upVote: Boolean
    });


    var userVote = UserVotes.findOne({
      voteChoiceId: userVoteAttributes.voteChoiceId,
      voterId: Meteor.userId()
    });

    UserVotes.upsert(userVote._id, {
        $set: { 
          upVote: !userVote.upVote
        }
      });

    return {
      upVote: userVote.upVote
    }

  }
});

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