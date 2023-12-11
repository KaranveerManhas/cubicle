const express = require('express');
const app = express();
const port = 2000;
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);
// Extract styles and scripts from subpages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo store is used to store session cookie in database
app.use(session({
    name: 'emprs',
    secret: 'manhas',
    saveUninitialized: false,
    resave: false,
    cookie: { 
        maxAge: (1000 * 60 * 60)
    },
    store: MongoStore.create({
        client: db.getClient(),
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongo setup ok'); 
    })
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Set locals.user
app.use(passport.setAuthenticatedUser);

// Flash messages
app.use(flash());
app.use(flashMiddleware.setFlash);

// Use express routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log(`Listening on port: ${port}`);
});