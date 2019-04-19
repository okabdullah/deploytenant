function (user, context, callback) {
  console.log('at beginning of rule');
  request.get({
    url: 'https://dl.dropboxusercontent.com/u/21665105/users.txt'
  }, function (err, response, body) {
    var whitelist = ['okabdullah91@gmail.com'];//body.split('\r\n');

    var userHasAccess = whitelist.some(function (email) {
      return email === user.email;
    });

    if (!userHasAccess) {
      console.log('Oops! you need a token, did you forget something?');
      return callback(new UnauthorizedError('Access denied.'));
    }

    callback(null, user, context);
  });
}