Template.myAtSocial.replaces("atSocial");

Template.atSocial.helpers({
  socialButtonLabel: function() {
    return AppLib.txtHelpers.capitalizeFirstLetter(this._id);
  }
});