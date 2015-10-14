//Db security/restrictions. See:https://atmospherejs.com/ongoworks/security

// Any client may insert, update, or remove a post without restriction
Votes.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
VoteChoices.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
