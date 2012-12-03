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
  app.use(express.cookieParser('sP4rK-_-_!&^juUuUdahjudajuda'));
  app.use(express.session());
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

app.get('/christmas', function (req, res) {
  res.render('christmas');
})

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
