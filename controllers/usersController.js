const Review = require('../models/review');
const User = require('../models/user');

// Secret Password for Admin Privileges
const adminSecretPass = process.env.ADMIN_SECRET_PASS;

// Sign in Page Module
module.exports.signIn = function (req, res){
    return res.render('./partials/user_sign_in', {
        title: "Sign In"
    });
}

// Sign Up page module
module.exports.signUp = function (req, res){
    return res.render('./partials/user_sign_up', {
        title: "Sign Up"
    });
}

// User Profile Module
module.exports.profile = function(req, res){
    
    let username = req.user.name.split(" ")[0];

    return res.render('./partials/profile', {
        title: `${username}'s Profile`
    });
}

// Create User Module
module.exports.create = async function (req, res){
    try{

        let user = await User.findOne({
            email: req.body.email
        });

        if(!user){
            adminPrivileges = false;

            if(req.body.isAdmin == 'true'){
                if(req.body.admin_password == adminSecretPass){
                    adminPrivileges = true;
                }else{
                    req.flash('error', "Incorrect Admin Secret Password");
                    return res.redirect('back');
                }
            }

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: adminPrivileges
            });

            req.flash('success', "User Created Successfully");
            return res.redirect('/users/sign-in');
        }

        req.flash('error',"User already exists");
        return res.redirect('back');

    }catch(err){
        console.log(err);
    }
}

// Creating users as admin 
module.exports.createUserAdmin = async function (req, res){
    try{

        let user = await User.findOne({
            email: req.body.email
        });

        if(!user){
            adminPrivileges = false;

            if(req.body.isAdmin == 'true'){
                if(req.body.admin_password == adminSecretPass){
                    adminPrivileges = true;
                }else{
                    req.flash('error', "Incorrect Admin Secret Password");
                    return res.redirect('back');
                }
            }

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: adminPrivileges
            });

            req.flash('success', "User Created Successfully");
            return res.redirect('back');
        }

        req.flash('error',"User already exists");
        return res.redirect('back');

    }catch(err){
        console.log(err);
    }
}

// Update User Module
module.exports.update = async function(req, res){
    try{

        let user = await User.findOneAndUpdate({
            _id: req.params.id
        }, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        req.flash('success', 'Profile Updated Successfully');
        return res.redirect('back');


    }catch(err){
        console.log(err);
    }
}

// Delete a user by admin
module.exports.deleteUser = async function(req, res){
    try{

        let user = await User.findByIdAndDelete(req.params.id);
        let allUsers = await User.find({});

        for (us of allUsers){
            if (us.reviewer.contains(req.params.id)){
                us.reviewer.pull(req.params.id);
            }
            if(us.reviewee.contains(req.params.id)){
                us.reviewee.pull(req.params.id);
            }

            await us.save();
        }

        return res.status(200).json({
            message: 'User deleted successfully',
            data: {
                data: user
            }
        });

    }catch(err){
        console.log(err);
    }
}


// Assign review to an employee
module.exports.assignReview = async function(req, res){

    try{

        let reviewer = await User.findById(req.body.reviewer).populate('assignedReviews');
        let reviewee = await User.findById(req.body.reviewee);
        let review = await Review.findOne({
            reviewer: reviewer,
            reviewee: reviewee
        });

        if(reviewee == null){
            req.flash('error', 'Please Select an Employee');
            return res.redirect('back');
        }else if(review != null){
            req.flash('error', "Review already assigned");
            return res.redirect('back');
        }
        reviewer.assignedReviews.push(reviewee);
        await reviewer.save();

        req.flash('success', 'Review Assigned');
        return res.redirect('back');


    }catch(err){
        console.log(err);
    }
}

// Create a review
module.exports.createReview = async function(req, res){
    try{

        let reviewer = await User.findById(req.body.reviewer).populate('assignedReviews').populate('selfReviews');
        let reviewee = await User.findById(req.body.reviewee).populate('assignedReviews').populate('selfReviews');

        let review = await Review.findOne({
            reviewer: reviewer,
            reviewee: reviewee
        });

        if(review){
            req.flash('error', `You've already reviewed ${reviewee.name}`);
            return res.redirect('back');
        }

        review = await Review.create({
            review: req.body.review,
            reviewer: reviewer,
            reviewee: reviewee
        });

        reviewer.assignedReviews.pull(reviewee);
        await reviewer.save();
        reviewee.selfReviews.push(review);
        await reviewee.save();

        return res.redirect('back');

    }catch(err){
        console.log(err);
    }
}

// Create session for admin
module.exports.createSessionAdmin = function (req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/admin');
}

// Create session for employee
module.exports.createSessionEmp = function (req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/emp');
}

// Destroy Session
module.exports.destroySession = function(req, res, next) {
    req.logout(err => {
        if(err){
            return next(err);
        }
        req.flash('success',"Logged out successfully");
        return res.redirect('/');
    });
}