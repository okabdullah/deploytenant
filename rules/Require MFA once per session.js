function (user, context, callback) {
  const completedMfa = !!context.authentication.methods.find(
    (method) => method.name === 'mfa'
  );
 
  if (completedMfa) {
    return callback(null, user, context);
  }
 
  context.multifactor = {
    provider: 'any',
    allowRememberBrowser: false
  };
 
  callback(null, user, context);
}