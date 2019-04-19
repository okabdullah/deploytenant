/*
*  This rule been automatically generated by auth0-authz-extension
*  Updated by auth0-authorization-extension, 2019-03-19T07:01:27.973Z
 */
function (user, context, callback) {
  var _ = require('lodash');
  var EXTENSION_URL = "https://omarmodern.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201";

  var audience = '';
  audience = audience || (context.request && context.request.query && context.request.query.audience);
  if (audience === 'urn:auth0-authz-api') {
    return callback(new UnauthorizedError('no_end_users'));
  }

  audience = audience || (context.request && context.request.body && context.request.body.audience);
  if (audience === 'urn:auth0-authz-api') {
    return callback(new UnauthorizedError('no_end_users'));
  }

  getPolicy(user, context, function(err, res, data) {
    if (err) {
      console.log('Error from Authorization Extension:', err);
      return callback(new UnauthorizedError('Authorization Extension: ' + err.message));
    }

    if (res.statusCode !== 200) {
      console.log('Error from Authorization Extension:', res.body || res.statusCode);
      return callback(
        new UnauthorizedError('Authorization Extension: ' + ((res.body && (res.body.message || res.body) || res.statusCode)))
      );
    }

    // Update the user object.
    user.groups = data.groups;

    // Store this in the user profile (app_metadata).
    saveToMetadata(user, data.groups, data.roles, data.permissions, function(err) {
      return callback(err, user, context);
    });
  });
  
  // Convert groups to array
  function parseGroups(data) {
    if (typeof data === 'string') {
      // split groups represented as string by spaces and/or comma
      return data.replace(/,/g, ' ').replace(/\s+/g, ' ').split(' ');
    }
    return data;
  }

  // Get the policy for the user.
  function getPolicy(user, context, cb) {
    request.post({
      url: EXTENSION_URL + "/api/users/" + user.user_id + "/policy/" + context.clientID,
      headers: {
        "x-api-key": configuration.AUTHZ_EXT_API_KEY
      },
      json: {
        connectionName: context.connection || user.identities[0].connection,
        groups: parseGroups(user.groups)
      },
      timeout: 5000
    }, cb);
  }

  // Store authorization data in the user profile so we can query it later.
  function saveToMetadata(user, groups, roles, permissions, cb) {
    user.app_metadata = user.app_metadata || {};
    user.app_metadata.authorization = {
      groups: groups,
    };

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function() {
      cb();
    })
    .catch(function(err){
      cb(err);
    });
  }
}