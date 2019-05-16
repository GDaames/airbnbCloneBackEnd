require('./models/db');
require('./config/passport');
var engines = require('./consolidate');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const houseListController = require('./controllers/houseListController');

var app = express();

app.engine('html', engines.swig); // take note, using 'html', not 'ejs' or 'pug'..
app.set('view engine', 'html');

// EJS
//app.use(expresslayouts);
//app.set('view engine', 'ejs');

//bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

// Passport 
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
//app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.render("house/homepage.hbs", {
        viewTitle: "List House"
    });
});

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});
app.use('/users', require('./routes/users.js'));
app.use('/profiles', require('./routes/profiles.js'));
app.use('/houseList', houseListController);
