function (user, context, callback) {
  const namespace = 'https://omaramodern.com/';
  user.user_metadata = user.user_metadata || {};
  user.app_metadata = user.app_metadata || {};
  //console.log(user.app_metadata.Orgs_member_of);
  context.idToken[namespace + 'Orgs_member_of'] =  user.app_metadata.Orgs_member_of;
  context.idToken[namespace + 'Organization_Id'] = context.clientID;
  context.accessToken[namespace + 'Orgs_member_of'] = user.app_metadata.Orgs_member_of;
  context.accessToken[namespace + 'Organization_Id'] = context.clientID;
  context.idToken[namespace + 'lastloggedin'] = new Date(context.authentication.methods.find(
    (method) => method.name === 'pwd'
  ).timestamp);
  console.log(context.idToken[namespace + 'lastloggedin']);
  //var scopes = context.accessToken.scopes();
  context.idToken[namespace + 'username'] = user.email;
  context.idToken[namespace + 'username'] = user.email;
  context.idToken[namespace + 'fullname'] = user.user_metadata.given_name + ' ' + user.user_metadata.family_name;
  context.accessToken[namespace + 'fullname'] = user.user_metadata.given_name + ' ' + user.user_metadata.family_name;
  //console.log(scopes);
  //if(user.locale)
  //{
      //context.idToken[namespace + 'role'] = user.locale;
      //console.log(user.locale);
      //context.idToken[namespace + 'Orgs_member_of'] = user.locale;
      //context.accessToken[namespace + 'Organization_Id'] = user.locale;
  //}
  //else
  //{
      //console.log("en");
  //}
  //context.idToken[namespace + 'favorite_color'] = user.user_metadata.favorite_color;
  //context.idToken[namespace + 'preferred_contact'] = user.user_metadata.preferred_contact;
  callback(null, user, context);
}