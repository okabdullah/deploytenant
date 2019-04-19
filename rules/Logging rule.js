function (user, context, callback) {
  //var HttpWritableStream = require('auth0-log-extension-tools').Streams.HttpWritableStream;
  var SumoLogger = require('sumo-logger');
  const SUMO_ENDPOINT = configuration.sumoendpoint;
  var connection = context.connection;
  var username = user.name;
  //var httpWritableStream = new HttpWritableStream(SUMO_ENDPOINT);
  //const SumoLogger = require('sumo-logger');
const opts = {
    endpoint: SUMO_ENDPOINT,
    clientUrl: 'http://localhost:5000/' // NODE version only,
    // ... any other options ...
};

// Instantiate the SumoLogger
const sumoLogger = new SumoLogger(opts);
  console.log('inside rule');
  //var $checkSessionServer=$http.post('data/check_session.php?cUid='+cUid);
    //$checkSessionServer.then(function(){
        //alert("session check returned!");
        //console.log("checkSessionServer is "+$checkSessionServer);
    //});
    //return $checkSessionServer; // <-- return your promise to the calling function

// Push a message to be logged
sumoLogger.log('logged in as ' + username + ' from connection:' + connection //'Quick Update to logs'
               //, {
  //sessionKey: 'Abc32df34rfg54gui8j098dv13sq5re',
 // url: 'https://localhost:5000/'
//}).then(function(value) {
  //console.log(value);
  // expected output: "Success!"
//}).catch(() => console.log('Failure'));
);
console.log('success updating sumologic');
// Flush any logs, typically this line would be in your shutdown code
sumoLogger.flushLogs();

//var data = '{"Trigger":"data" }';
//httpWritableStream.write(data, function() {
  // Now the data has been written.
//});
  // TODO: implement your rule
  callback(null, user, context);
}