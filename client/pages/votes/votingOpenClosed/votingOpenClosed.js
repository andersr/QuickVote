Template.votingOpenClosed.onRendered(function(){
  var votingEnabled = Votes.findOne({_id: Router.current().params._id}).votingEnabled;

  if (votingEnabled) {
    this.$('.voteOpenClose').bootstrapToggle('on');
  } else {
    this.$('.voteOpenClose').bootstrapToggle('off');
  };

});

Template.votingOpenClosed.helpers({
  isOpen: function(){
    return "checked";
  }
});


Template.votingOpenClosed.events({
  "change .voteOpenClose": function(event){

    var voteAttributes = {
      voteId: Router.current().params._id,
      votingEnabled: $(event.target).is(':checked')
    };

    console.log(voteAttributes.votingEnabled);

    Meteor.call('openCloseVote', voteAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      }
    });
  }
});

Template.votingOpenClosed.onDestroyed(function(){
   this.$('.voteOpenClose').bootstrapToggle('destroy');
});


// 'click .selectPill': function(e) {
//     var name = $(e.target).attr('for');
//     if ($("input[name='+name+']").attr('checked') == 'checked'){
//       $("input[name='+name+']").trigger('change').removeAttr('checked');
//     }
//     else{
//       $("input[name='+name+']").trigger('change').attr('checked', 'checked');
//     }
//   },
//   'change #input':function(e){
//     alert("value changed");
//   }