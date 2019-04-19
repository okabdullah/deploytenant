function (user, context, callback) {
  // 
  // this rule can be used if you have chosen to use Username as the way to identify a user in Salesforce. Notice that we are mapping the email to the nameidentifier.
  //
  if (context.clientName === 'SalesForceApplication3rdParty') { 
    context.samlConfiguration.mappings = {
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': 'email',
      'User.Username': 'email',
      'User.Email':   'email',
      'User.FirstName': 'given_name',
      'User.ProfileId': 'salesforce_profile_id',
      'User.LastName':  'family_name'
    };
  }

  callback(null, user, context);
}