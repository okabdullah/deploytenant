function (user, context, callback) {
  user.user_metadata = user.user_metadata || {};
  user.user_metadata.color = user.user_metadata.color || 'blue';
  context.idToken['https://example.com/favorite_color'] = user.user_metadata.color;

  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
        callback(null, user, context);
    })
    .catch(function(err){
        callback(err);
    });
}