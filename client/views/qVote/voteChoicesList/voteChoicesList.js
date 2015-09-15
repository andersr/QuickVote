Template.voteChoicesList.helpers({

  voteChoices:function(){
    return VoteChoices.find({voteId: Router.current().params._id }, {sort: {updatedAt: -1}});
  }
});