Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  user.profile = options.profile ? options.profile : {};
  return user;
});

  ServiceConfiguration.configurations.update(
    {service: 'google'},
    {$set: {loginStyle: 'redirect'}}
  );

// ServiceConfiguration.configurations.upsert(
//   { service: "google" },
//   {
//     $set: {
//       loginStyle: "redirect"
//     }
//   }
// );

// var currentBrowser;
// var currentPlatform;

//  if (Meteor.isClient){
//  currentBrowser = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
//  currentPlatform = /iPad|iPhone|iPod/.test(navigator.platform);
//  };


// if (currentPlatform == 'iOS' && currentBrowser == 'chrome'){
//   ServiceConfiguration.configurations.update(
//     {service: 'google'},
//     {$set: {loginStyle: 'redirect'}}
//   );
//   // ServiceConfiguration.configurations.update(
//   //   {service: 'facebook'},
//   //   {$set: {loginStyle: 'redirect'}}
//   // );
// };


// if (Session.get("chromeOnIphone")){
//   ServiceConfiguration.configurations.update(
//     {service: 'google'},
//     {$set: {loginStyle: 'redirect'}}
//   );
//   // ServiceConfiguration.configurations.update(
//   //   {service: 'facebook'},
//   //   {$set: {loginStyle: 'redirect'}}
//   // );
// };

// if(BrowserDetect.browser == "Chrome"){
//   ServiceConfiguration.configurations.update(
//     {service: 'google'},
//     {$set: {loginStyle: 'redirect'}}
//   );
// };


// Meteor.loginWithFacebook({
//   requestPermissions: ['user', 'public_repo']
// }, function (err) {
//   if (err)
//     Console.log('accounts error: ' + (err.reason || 'Unknown error'));
// });

// if (inUIWebView) {
//   Meteor.loginWithFacebook({ loginStyle: "popup" }, callback);
// } else {
//   Meteor.loginWithFacebook({ loginStyle: "redirect" });
// }