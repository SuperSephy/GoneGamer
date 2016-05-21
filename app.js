
// =========================
// get the packages we need 
// =========================

var express       = require('express'),
    config        = require('./config'),                        // get our config file;
    env           = process.env.NODE_ENV;
    
var app           = new express(),

    hbs           = require('hbs'),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    morgan        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),

    session       = require('express-session'),                 // used to manage sessions (used with MongoDBStore below)
    jwt           = require('jsonwebtoken'),                    // used to create, sign, and verify tokens
    mongoose      = require('mongoose'),                        // used to access mongo db
    Firebase      = require('firebase'),                        // used for chat

    log           = require('debug')('goneGamer:app.js'),
    io            = require('socket.io')({path: '/socket.io'}),

    databases     = config.databases[env];

MongoDBStore      = require('connect-mongodb-session')(session);// used to access session data in mongoDB
app.io            = io;
// module.exports    = io;

// =========================
// configuration ===========
// =========================
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = 'mongodb://' +
    process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
    //'mongodb://localhost:27017/goneGamer';
} else if (process.env.MONGOLAB_URI) {
  connection_string = process.env.MONGOLAB_URI;
} else {
  connection_string =   'mongodb://';
  connection_string +=  databases.mongo.users.goneGamer.user  ? databases.mongo.users.goneGamer.user + ":"  : '';
  connection_string +=  databases.mongo.users.goneGamer.pwd   ? databases.mongo.users.goneGamer.pwd + "@"   : '';
  connection_string +=  databases.mongo.host + ":" + databases.mongo.port + "/" + databases.mongo.users.goneGamer.db;
}
console.log('Connection String: '+connection_string);
mongoose.connect(connection_string);                          // connect to database
app.set('superSecret', config.secret);                        // secret variable


// =========================
// session store ===========
// =========================
var store = new MongoDBStore({ 
  uri: connection_string,
  collection: 'sessions',
  expires: Date.now() + (30 * 24 * 60 * 60 * 1000)
});
console.log(Date.now());
console.log(Date.now() + (30 * 24 * 60 * 60 * 1000));

// Catch errors 
store.on('error', function(error) {
  if (error) throw error;
});

app.use(require('express-session')({
  // name: 'x-session-id',                                    // default is connect.sid
  secret: config.secret,
  cookie: {
    // maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    maxAge: null
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));


// =========================
// application init ========
// =========================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Handlebars Partials/Helpers
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('year',  function() { return new Date().getFullYear(); });
hbs.registerHelper('json',  function(context) {return JSON.stringify(context); });
hbs.registerHelper('ifDev', function(options) {if(process.env.NODE_ENV != 'prod') {return options.fn(this); } return options.inverse(this); });
hbs.registerHelper('isset', function (value, safeValue) {
    var out = value || safeValue;
    return new Handlebars.SafeString(out);
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sample Firebase Connection
// var gameChat = new Firebase(config.databases[env].firebase.url);
// gameChat.child('gameNight/naruto/characters/Koma/accuracy').on("value", function(d){
//   console.log(d.val());
// });

// =========================
// Route Set Up ============
// =========================

var route_obj = {'/':'pages', '/auth':'auth', '/api':'api'};
for (var path in route_obj) {
  app.use(config.base_url+path, require('./routes/'+route_obj[path]));
}


// =========================
// Defaults ================
// =========================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// =========================
// Error Handlers ==========
// =========================

// development error handler
// will print stacktrace
if (app.get('env') !== 'prod') {
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


module.exports = app;
