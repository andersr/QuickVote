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
      var firstWordAndFirstCharOfSecondWord = words[0] + " " + words[1].charAt(0) + ".";

      return firstWordAndFirstCharOfSecondWord;
    }
  }
  
};