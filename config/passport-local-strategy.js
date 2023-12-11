const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Setup passport local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    async function (req, email, password, done){
        // Find user and establish identity
        try{
            let user = await User.findOne({
                email: email
            });

            if(!user || user.password != password){
                req.flash('error',"Invalid credentials");
                return done(null, false);

            }else if(req.url == "/admin/create-session" && !user.isAdmin){
                req.flash('error',"Please login to the employee login form");
                return done(null, false);
                
            }else if(req.url == "/emp/create-session" && user.isAdmin){
                req.flash('error',"Please login to the admin login form");
                return done(null, false);
            }

            return done(null, user);

        }catch(err){
            req.flash('error', err);
            return done(err);
        }
    }
));

// Serializing user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserializing user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try{

        let user = await User.findById(id);
        return done(null, user);

    }catch(err){
        console.log(err);
        return done(err);
    }
});

// Check user authentication for general profile related requests
passport.checkProfileAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You are not allowed to visit that page');
    return res.redirect('back');
}
// Check user access to redirect to correct page otherwise redirect to login page
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            return res.redirect('/admin');
        }else{
            return res.redirect('/emp');
        }
    }
    return next();
}

// Check if the user is authenticated and has admin access
passport.checkAuthenticationAdmin = function(req, res, next){
    // If user is signed in, then pass on the request to the next function (controller)

    if(req.isAuthenticated() && req.user.isAdmin){
        return next();
    }

    return res.redirect('back');
}

// Check if the user is authenticated and has employee access
passport.checkAuthenticationEmp = function(req, res, next){
    // If user is signed in, then pass on the request to the next function (controller)

    if(req.isAuthenticated() && !req.user.isAdmin){
        return next();
    }

    return res.redirect('back');
}

// Store current authenticated user in locals
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;