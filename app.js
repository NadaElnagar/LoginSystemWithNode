const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

//passport config
require('./config/passport')(passport);
//express session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
 }))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());
// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
//DB config
const db = require('./config/keys').MongoURI
//connect to mongoose
mongoose.connect(db,{useNewUrlParser:true})
    .then(()=>console.log('connect to mangoose'))
    .catch(err=>console.log('error connect to mongoose'))
//ejs
app.use(expressLayouts);
app.set('view engine','ejs');
//BodyParser
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
//listen
app.listen(5000, function() {
    console.log('listening on 3000')
})