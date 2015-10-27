  Meteor.methods({

    clickToUpdate:function(updateAttributes){

      check(Meteor.userId(), String);
      check(updateAttributes, {
        itemId: String,
        collection: String,
        fieldKey: String,
        fieldValue: String
      });

      var dbUpdate = {};
      dbUpdate[updateAttributes.fieldKey] = updateAttributes.fieldValue;

      //security hack to prevent non-owner of a voteChoice from updating it
      if (updateAttributes.collection === 'voteChoices') {
        var voteChoice = VoteChoices.findOne({_id: updateAttributes.itemId });

        if (voteChoice.owner != Meteor.userId()) {
          return;
        };
      };

      Mongo.Collection.get(updateAttributes.collection).update(updateAttributes.itemId,{ 
        $set: dbUpdate
      });

    }
  });