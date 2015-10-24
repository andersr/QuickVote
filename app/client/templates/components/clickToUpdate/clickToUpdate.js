Template.clickToUpdate.onCreated(function(){

  var
  templateInstance                 = this;
  templateInstance.fieldKey         = new ReactiveVar(this.data.fieldKey),
  templateInstance.itemId     = new ReactiveVar(this.data.itemId),
  templateInstance.editing         = new ReactiveVar(false),
  templateInstance.editableItem    = new ReactiveVar(null)
  ;
 
  templateInstance.autorun(function(){
    templateInstance.editing.set(
      templateInstance.itemId.get() === templateInstance.editableItem.get()
    );
  });
});

Template.clickToUpdate.helpers({
  editing: function () {
    return Template.instance().editing.get();
  },
  fieldValue: function () {
    return this.fieldValue;
  }
});

Template.clickToUpdate.events({

  'click .edit-item': function () {
    Template.instance().editableItem.set(Template.instance().itemId.get());
  },

  'click .cancel-edit': function () {
    Template.instance().editableItem.set(null);
  },

  "submit .click-to-edit-form": function(event, template){
    event.preventDefault();

    var itemAttributes = {};
    itemAttributes.itemId = this.itemId;
    itemAttributes.fieldKey = this.fieldKey;
    itemAttributes.collection = this.collection;
    itemAttributes.fieldValue = template.find('.click-to-edit-form .field-value').value;

    AppLib.collectionHelpers.clickToUpdate(itemAttributes);

    Template.instance().editableItem.set(null);
  }

});