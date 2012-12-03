/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'sP4rK-_-_!&^juUuUdahjudajuda 961832626823650' }));
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// A very limited set of websites we're hosting.
// This should probably be handled in the router, but I'm lazy.

app.get('/', function (req, res) {
  res.render('index', {message: null});
});

app.get('/demo', function (req, res) {
  res.render('demo');
});

app.get('/api', function (req, res) {
  res.render('api', {message: null});
});

app.get('/press', function (req, res) {
  res.render('press');
})

app.get('/christmas', function(req, res) {
  req.session.xmas = 1
  res.render('christmas');
});

app.post('/christmas/login', function(req, res) {
  if (1 === req.session.xmas && req.body.userID && req.body.accessToken) {
    req.session.userID = req.body.userID;
    req.session.accessToken = req.body.accessToken;
    new Action({
      userID      : req.body.userID,
      accessToken : req.body.accessToken,
      ip          : req.ip,
      createdAt   : new Date().toISOString(),
      action      : 'login'
    }).save();
    res.send(200);
  } else {
    res.send(403);
  }
});

app.post('/christmas/:component', function(req, res) {
  if (1 === req.session.xmas && 1 === req.params.component.length && req.session.userID) {
    Action.findOne({ userID: req.session.userID, action: 'login' }, function(err, action) {
      if (action && !err) {
        new Action({
          userID      : req.session.userID,
          accessToken : req.session.accessToken,
          ip          : req.ip,
          createdAt   : new Date().toISOString(),
          action      : req.params.component
        }).save();
        http.request({
          method: 'PUT',
          host: 'sprk.io',
          path: '/device/Henry/toggle/' + component + '?api_key=fb91rfPFS84wmzH3'
        });
      }
    });
    res.send(200);
  } else {
    res.send(403);
  }
});

app.get('/kickstarter', function (req, res) {
  res.redirect('http://www.kickstarter.com/projects/sparkdevices/spark-upgrade-your-lights-with-wi-fi-and-apps/');
})

app.post('/', function (req, res) {
  var signup = new Signup({email: req.body.email, source: "Front page"});
  signup.save();
  res.render('index', {message: "Thank you for signing up! We'll be in touch soon."});
});

app.post('/api', function (req, res) {
  var signup = new Signup({email: req.body.email, source: "API Docs"});
  signup.save();
  res.render('api', {message: "Thank you for signing up! We'll be in touch soon."})
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Mongoose stuffs

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://judy:cosmogspacely@alex.mongohq.com:10094/Spark-Signups');

var schema = mongoose.Schema({ email: 'string', source: 'string' });
var Signup = db.model('Signup', schema);

schema = mongoose.Schema({
  userID      : 'string',
  accessToken : 'string',
  ip          : 'string',
  createdAt   : 'string',
  action      : 'string'
});
var Action = db.model('Action', schema);
