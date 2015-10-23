Template.clickToEdit.onCreated(function(){
  // console.log("currentItem: " + this.data.itemName);
  console.log("title value: " + this.data._id);


  // var itemAttributes = {};

  // itemAttributes.itemKey = this.data.itemName; //"title"
  // itemAttributes.itemValue = this.data.itemAttributes[itemAttributes.itemKey]; //value of title

  //  console.log("item value: " + itemAttributes.itemValue);


  var
  templateInstance                 = this;
  templateInstance.itemKey         = new ReactiveVar(this.data.itemKey),
  templateInstance.currentItem     = new ReactiveVar(this.data._id),
  templateInstance.itemName       = new ReactiveVar(this.data.itemName),
  // templateInstance.itemCollection = new ReactiveVar(this.data.itemCollection),
  templateInstance.editing         = new ReactiveVar(false),
  templateInstance.editableItem    = new ReactiveVar(null)
  ;

  // templateInstance.itemAttributes = new ReactiveVar();

  

  templateInstance.autorun(function(){
    templateInstance.editing.set(
      templateInstance.currentItem.get() === templateInstance.editableItem.get()
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
  itemLabel: function () {
    // var fieldName = 
    return this.itemName;
  }
});

Template.clickToEdit.events({

  'click .edit-item': function () {
     // console.log("edit id: " + this._id + "itemId: " + this.itemId);
    Template.instance().editableItem.set(Template.instance().currentItem.get());
  },

  'click .cancel-edit': function () {
    Template.instance().editableItem.set(null);
  },

  "submit .update-item": function(event, template){
    event.preventDefault();
    // console.log("collection name: " + this.itemCollection);

    var itemAttributes = {};
    // var currentAttribute = Template.instance.itemLabel.get();

    itemAttributes.id = this.itemId;
    itemAttributes.fieldName = this.itemKey;
    itemAttributes.collection = this.itemCollection;
    itemAttributes.fieldValue = template.find('.update-item .item-title').value;

    AppLib.collectionHelpers.clickToEditUpdate(itemAttributes);

    Template.instance().editableItem.set(null);
  }

});