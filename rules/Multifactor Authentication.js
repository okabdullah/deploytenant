function (user, context, callback) {
  /*
  You can trigger MFA conditionally by checking:
  1. Client ID:
  context.clientID === 'REPLACE_WITH_YOUR_CLIENT_ID'
  2. User metadata:
  user.user_metadata.use_mfa
  */
  user.app_metadata = user.app_metadata || {};
  //user.app_metadata.mfatype = user.app_metadata || "any";
  var mfafactor =  user.app_metadata.mfatype || "any";
  console.log (mfafactor);
  // if (<condition>) {
    context.multifactor = {
      provider: mfafactor, //user.app_metadata.mfatype,//"any",//user.app_metadata.mfatype,//'any',

      // optional, defaults to true. Set to false to force authentication every time.
      // See https://auth0.com/docs/multifactor-authentication/custom#change-the-frequency-of-authentication-requests for details
      allowRememberBrowser: false
    };
  //}

  callback(null, user, context);
}