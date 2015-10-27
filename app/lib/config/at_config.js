AccountsTemplates.configure({
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  texts: {
    title: {
      signIn: "Sign in with..."
    },
    errors: {
      accountsCreationDisabled: "Sorry, account creation is currently disabled.",
      cannotRemoveService: "Sorry, can't remove the only active service.",
      captchaVerification: "Sorry, captcha verification failed.",
      loginForbidden: "Sorry, your email and/or password were incorrect.",
      mustBeLoggedIn: "Sorry, you need to be signed in to continue.",
      pwdMismatch: "Oops, looks like those passwords don't match.",
      validationErrors: "There was a problem with the info you entered. Please try again.",
      verifyEmailFirst: "Please check your inbox and verify your email before continuing.",
    }
  }
});