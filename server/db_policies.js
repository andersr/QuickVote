//Db security/restrictions. See:https://atmospherejs.com/ongoworks/security

// Any client may insert, update, or remove a post without restriction
Topics.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Votes.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
