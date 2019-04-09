const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


const app = express();

//DB Config
const db = require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db, {useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//EJS
app.use(expresslayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false}))

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

//connect flash
app.use(flash());

//Global vars
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash
})

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const port = 3000 || process.env.port;

app.listen(port, () => console.log(`Server started on port ${port}`));


// mongoose.connect('mongodb+srv://root:B!tsplease@cluster0-pg4c8.mongodb.net/test?retryWrites=true', 
//     {useNewUrlParser: true },(err)=>
//     {
//         if(err) {
//             console.log('Some problem with the connection ' +err);
//         } else {
//             console.log('The Mongoose connection is ready');
//         }
//     });