//Db security/restrictions. See:https://atmospherejs.com/ongoworks/security



Votes.permit(['insert']).ifLoggedIn().apply();
Votes.permit(['update', 'remove']).ifHasUserId(this.userId).apply();

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

Votes.deny({  
  update: function (userId, docs, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});


// from http://joshowens.me/meteor-security-101/
// Any client may insert, update, or remove a post without restriction
// Votes.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
// VoteChoices.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
