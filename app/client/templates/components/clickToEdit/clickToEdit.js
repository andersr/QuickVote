Template.clickToEdit.onCreated(function(){
  // console.log("currentItem: " + this.data.itemName);
  // console.log("title value: " + this.data._id);


  // var itemAttributes = {};

  // itemAttributes.itemKey = this.data.itemName; //"title"
  // itemAttributes.itemValue = this.data.itemAttributes[itemAttributes.itemKey]; //value of title

  //  console.log("item value: " + itemAttributes.itemValue);


  var
  templateInstance                 = this;
  templateInstance.fieldKey         = new ReactiveVar(this.data.fieldKey),
  templateInstance.itemId     = new ReactiveVar(this.data.itemId),

  // templateInstance.itemCollection = new ReactiveVar(this.data.itemCollection),
  templateInstance.editing         = new ReactiveVar(false),
  templateInstance.editableItem    = new ReactiveVar(null)
  ;

  // templateInstance.itemAttributes = new ReactiveVar();

  // console.log("item id: " + templateInstance.itemId.get());

  

  templateInstance.autorun(function(){
    templateInstance.editing.set(
      templateInstance.itemId.get() === templateInstance.editableItem.get()
    );
  });
});

// Template.clickToEdit.onRendered(function(){
//     $( "input[name=itemTitle]" ).focus();
// });


Template.clickToEdit.helpers({
  editing: function () {
    // var fieldName = 
    return Template.instance().editing.get();
  },
  fieldValue: function () {
    // var fieldName = 
    return this.fieldValue;
  }
});

Template.clickToEdit.events({

  'click .edit-item': function () {
     // console.log("edit id: " + this._id + "itemId: " + this.itemId);
    Template.instance().editableItem.set(Template.instance().itemId.get());
  },

  'click .cancel-edit': function () {
    Template.instance().editableItem.set(null);
  },

  "submit .click-to-edit-form": function(event, template){
    event.preventDefault();
    // console.log("collection name: " + this.itemCollection);

    var itemAttributes = {};
    // var currentAttribute = Template.instance.itemLabel.get();

    itemAttributes.itemId = this.itemId;
    itemAttributes.fieldKey = this.fieldKey;
    itemAttributes.collection = this.collection;
    itemAttributes.fieldValue = template.find('.click-to-edit-form .field-value').value;

    AppLib.collectionHelpers.clickToEditUpdate(itemAttributes);

    Template.instance().editableItem.set(null);
  }

});