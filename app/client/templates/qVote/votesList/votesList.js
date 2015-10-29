Template.votesList.onCreated(function(){
  
  var instance = this;

  //Set amount to load each time 'load more' is clicked
  instance.pageIncrement = new ReactiveVar(AppLib.listHelpers.pageIncrement);

  //check if subscriptions are ready
  instance.subscriptionsReady = new ReactiveVar(false);

  // set default value for qty of items to display
  instance.limit         = new ReactiveVar(instance.pageIncrement.get());

  //Qty of items that have been loaded
  instance.loaded    = new ReactiveVar(0);

  instance.autorun(function(){

    //subscribe to the most recent limit
    var votesSubscription = instance.subscribe('votes', instance.limit.get());
    
    if (votesSubscription.ready()) {
      instance.subscriptionsReady.set(true);

    } else {
      // console.log("vote subscription is not ready yet");
      instance.subscriptionsReady.set(false);
    };
  });

  instance.votes = function(){
    return Votes.find({}, { limit: instance.limit.get() });
  }

});



Template.votesList.helpers({
  subscriptionsReady: function(){
    return Template.instance().subscriptionsReady.get();
  },
  showMore: function(){
     return Counts.get('votesCount') > Template.instance().limit.get();
  },
  noVotes:function(){
    return Counts.get('votesCount') === 0;
  },
  creatingVote:function(){
    return Session.get("newVote");
  },
  isOwner:function(){
    return this.owner === Meteor.userId();
  },
  votes: function(){
    return Template.instance().votes();
  }
});


Template.votesList.events({

  "click .show-more": function(){
    Template.instance().limit.set(Template.instance().limit.get() + Template.instance().pageIncrement.get());
  }
});
