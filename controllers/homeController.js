const User = require('../models/user');
const Review = require('../models/review');

module.exports.home = function(req, res) {
    res.render('./partials/user_sign_in', {
        title: 'Sign In'
    });
}

// Admin view
module.exports.adminView = async function(req, res){
    try{

        let users = await User.find({
            _id: {
                $ne: req.user._id
            }
        });

        let reviews = await Review.find({}).populate('reviewer').populate('reviewee');
        return res.render('./partials/admin_view', {
            title: 'Home',
            users: users,
            all_reviews: reviews
        });

    }catch(err){
        console.log("Error: " + err);
    }
}

// Employee view
module.exports.empView = async function(req, res){
    try{

        let user = await User.findOne(req.user).populate('assignedReviews').populate({
            path: 'selfReviews',
            populate: {
                path: 'reviewer'
            }
        });

        
        return res.render('./partials/employee_view', {
            title: 'Home',
            user: user
        });

    }catch(err){
        console.log(err);
    }
}