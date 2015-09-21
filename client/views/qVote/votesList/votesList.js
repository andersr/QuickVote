Template.votesList.helpers({
  noVotes:function(){
    return Counts.get('votesCount') === 0;
  }
})
