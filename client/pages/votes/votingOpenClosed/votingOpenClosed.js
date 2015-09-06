Template.votingOpenClosed.onRendered(function(){
   this.$('.voteOpenClose').bootstrapToggle();
});

Template.votingOpenClosed.helpers({
  isOpen: function(){
    return "checked";
  }
});


Template.votingOpenClosed.events({
  "change .voteOpenClose": function(event){
    var checked = $(event.target).is(':checked');
    if (checked) {
      Session.set("votingOpen", true);
    } else {
      Session.set("votingOpen", false);
    };


    // console.log(checked);
  }
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