  Meteor.methods({

    clickToEditUpdate:function(updateAttributes){

      check(Meteor.userId(), String);
      check(updateAttributes, {
        id: String,
        collection: String,
        fieldName: String,
        fieldValue: String
      });
      var dbUpdate = {};
      dbUpdate[updateAttributes.fieldName] = updateAttributes.fieldValue;

     Mongo.Collection.get(updateAttributes.collection).update(updateAttributes.id,{ 
      $set: dbUpdate
     });

    }
  });