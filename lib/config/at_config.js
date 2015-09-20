// AccountsTemplates.configure({
//   forbidClientAccountCreation: true,
//   texts: {
//     title: {
//       signIn: "Please sign in to continue"
//     }
//   }
// });

AccountsTemplates.configure({
  forbidClientAccountCreation: false,
  texts: {
    title: {
      signIn: "Sign in with..."
    }
  }
});

// AccountsTemplates.configureRoute('signIn', {
//     redirect: function(){
//         var user = Meteor.user();
//         if (user)
//           Router.go('home');
//     }
// });