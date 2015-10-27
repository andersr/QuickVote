//Db security/restrictions. See:https://atmospherejs.com/ongoworks/security
Security.defineMethod('isVoteOwner', {
  fetch: ['owner'],
  deny: function (type, arg, userId, doc) {
    return userId !== doc.owner;
  }
});

Security.defineMethod('isVoter', {
  fetch: ['userId'],
  deny: function (type, arg, userId, doc) {
    return userId !== doc.userId;
  }
});


// VOTES Policies
//Only allow authenticated users to create votes
Votes.permit(['insert']).ifLoggedIn().apply();

//Only allow the owner of a vote to update or remove it
Votes.permit(['update', 'remove']).isVoteOwner().apply();

// VOTE CHOICES Policies
//Must be vote owner to add/update/remove a corresponding vote choice
VoteChoices.permit(['insert', 'update', 'remove']).isVoteOwner().apply();

// USER VOTES Policies

// Must be authenticated to insert a userVote
UserVotes.permit(['insert']).ifLoggedIn().apply();

// Must be owner of user vote to update or remove
UserVotes.permit(['update', 'remove']).isVoter().apply();
