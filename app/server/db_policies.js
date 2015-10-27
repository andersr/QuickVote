//Db security/restrictions. See:https://atmospherejs.com/ongoworks/security
Security.defineMethod('ownsVote', {
  fetch: ['owner'],
  deny: function (type, arg, userId, doc) {
    return userId !== doc.owner;
  }
});

//Only allow authenticated users to create votes
Votes.permit(['insert']).ifLoggedIn().apply();

//Only allow the owner of a vote to update or remove it
Votes.permit(['update', 'remove']).ownsVote().apply();


//Must be vote owner to add/update/remove a corresponding vote choice
VoteChoices.permit(['insert', 'update', 'remove']).ownsVote().apply();


// Votes.permit(['update', 'remove']).ifHasUserId(this.userId).apply();

// Votes.allow({  
//   insert: function (userId, doc) {
//     return userId;
//   },
//   update: function (userId, doc, fields, modifier) {
//     // can only change your own documents
//     return doc.userId === userId;
//   },
//   remove: function (userId, doc) {
//     // can only remove your own documents
//     return doc.userId === userId;
//   }
// });


// deny anyone that tries to update the document userId:
// Votes.deny({  
//   update: function (userId, docs, fields, modifier) {
//     // can't change owners
//     return _.contains(fields, 'userId');
//   }
// });