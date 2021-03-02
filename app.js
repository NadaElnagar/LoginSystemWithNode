const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

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
app.listen(4000, function() {
    console.log('listening on 3000')
})