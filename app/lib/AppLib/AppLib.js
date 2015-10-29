AppLib = {
  
  constants: {
    appName: "QuickVote"
    // ,
    // appContactEmail: "&#97;&#110;&#100;&#101;&#114;&#115;&#43;&#113;&#118;&#111;&#116;&#101;&#64;&#97;&#110;&#100;&#101;&#114;&#115;&#46;&#99;&#111;"
    //anders+qvote@anders.co, ion-email
  },

  txtHelpers: {

    capitalizeFirstLetter: function(str){
      return str[0].toUpperCase() + str.substr(1);
    },

    firstWordFirstCharOfSecondWord: function(str){
      var words = str.split(' ');
      if (words.length > 0) {
        return words[0] + " " + words[1].charAt(0);
      } else {
        return words[0];
      };
     
    }
  },
  
  listHelpers: {
    pageIncrement: 25
  },

  collectionHelpers: {

    clickToUpdate: function(updateAttributes){
      // console.log("updateAttributes: " + updateAttributes);

      Meteor.call('clickToUpdate', updateAttributes, function(error, result){
        if (error){
          console.log(error.reason);
        } ;
      });
    }
  }
  // , 
  // layoutHelpers: {
  //   scrollToTop: function(){
  //     window.addEventListener("load",function() {
  //     // Set a timeout...
  //     Meteor.setTimeout(function(){
  //       // Hide the address bar!
  //       window.scrollTo(0, 1);
  //     }, 0);
  //   });
  //   }
  // }
};