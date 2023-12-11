const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const passport = require('passport');

// Common user routes
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.get('/profile', passport.checkProfileAuthentication, usersController.profile);
router.post('/update/:id', passport.checkProfileAuthentication, usersController.update);
router.get('/delete/:id', passport.checkAuthenticationAdmin, usersController.deleteUser);
router.post('/create', usersController.create);

// Employee Routes
router.post('/emp/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
    ), usersController.createSessionEmp);
router.post('/emp/create-review', passport.checkAuthenticationEmp, usersController.createReview);



// Admin routes
router.post('/admin/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSessionAdmin);
router.post('/admin/create-user', passport.checkAuthenticationAdmin, usersController.createUserAdmin);
router.post('/admin/assign-review', passport.checkAuthenticationAdmin, usersController.assignReview);
router.post('/admin/create-review', passport.checkAuthenticationAdmin, usersController.createReview);
// Sign out
router.get('/sign-out', usersController.destroySession);


module.exports = router;
