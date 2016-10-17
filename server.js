

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var grabBag = require('./server/routes/grabBag');





var app = express();

// view engine setup
app.set('views',path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var config = require('./config.json');

app.use('/', routes);
app.use('/users', users);
app.use('/api/grabBag', grabBag);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//db connections
var mongoose = require('mongoose');
var db_server = process.env.DB_ENV || config.connectionString; ;

mongoose.connection.on("connected", function(ref) {
  console.log("connected to " + db_server + " DB");

});

mongoose.connection.on("error", function(err) {
  console.error("Failed to connect to DB " + db_server + ' on startup ', err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connectionw ith DB: ' + db_server + ' disconnected');
});

var gracefulExit = function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection wit DB: ' + db_server + ' is disconnected through app termination');
    process.exit(0);
  });
};

//close db connection when node process ends
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

try {
  mongoose.connect(db_server);
  console.log("Trying to connect to DB " + db_server);
}
catch(err)
{
  console.log('DB initialization failed: ' + err.message);
}


var debug = require('debug')('server');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));

console.log('Listening on port: ' + app.get('port'));






module.exports = app;
