var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user){
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err){
        return done(err);
      })
  })
)

var Tournament = require("./models/tournament");

require('dotenv').config();
const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")});

async function recreateDB() {
  await Tournament.deleteMany();

  let results = [
    { name: "World Cup", year: 2014, location: "Brazil" },
    { name: "Summer Olympics", year: 1948, location: "London" },
    { name: "Super Bowl XXXVI", year: 2002, location: "New Orleans" },
    { name: "UEFA Champions League Final", year: 2017, location: "Wales" },
    { name: "NBA Finals", year: 2020, location: "Orlando" },
    { name: "Winter Olympics", year: 2006, location: "Turin" },
    { name: "The Masters Tournament", year: 2024, location: "Augusta" },
    { name: "Cricket World Cup", year: 2007, location: "West Indies" },
    { name: "Copa America", year: 2019, location: "Brazil" },
    { name: "FIFA World Cup", year: 2018, location: "Russia" }
  ];

  results.forEach(tournamentData => {
    let tournamentInstance = new Tournament(tournamentData);
    tournamentInstance.save().then(doc=>{
      console.log(`${doc.name} tournament saved`);
    })
    .catch(err=>{
      console.error(err);
    });
  });
}

let reseed = true;
if (reseed) {recreateDB();};

var gridRouter = require('./routes/grid');
var indexRouter = require('./routes/index');
var pickRouter = require('./routes/pick');
var tournamentsRouter = require('./routes/tournaments');
var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/tournaments', tournamentsRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
