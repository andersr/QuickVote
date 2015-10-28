Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  user.profile = options.profile ? options.profile : {};
  return user;
});

// ServiceConfiguration.configurations.upsert(
//   { service: "google" },
//   {
//     $set: {
//       loginStyle: "redirect"
//     }
//   }
// );