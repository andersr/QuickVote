Template.dkAlert.helpers({
  undoAction: function(){
    return Session.get("undoAction");
  }
});


Template.dkAlert.events({

  "click .undo-action":function(e){
    e.preventDefault()
    
    // sAlert.close(Session.get("clearContentAlert"));

    // DkHelpers.setDocTitle(Session.get("localContent"))
    
    // Meteor.setTimeout((->
    //   sAlert.info('Content restored.', {effect: 'stackslide', position: 'bottom'})
    // ), 500)

  }
});