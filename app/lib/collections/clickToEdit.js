  Meteor.methods({

    clickToEditUpdate:function(updateAttributes){

      check(Meteor.userId(), String);
      check(updateAttributes, {
        itemId: String,
        collection: String,
        fieldKey: String,
        fieldValue: String
      });
      var dbUpdate = {};
      dbUpdate[updateAttributes.fieldKey] = updateAttributes.fieldValue;

     Mongo.Collection.get(updateAttributes.collection).update(updateAttributes.itemId,{ 
      $set: dbUpdate
     });

    }
  });