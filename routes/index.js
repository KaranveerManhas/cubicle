const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const passport = require('passport');

router.get('/', passport.checkAuthentication, homeController.home);
router.get('/admin', passport.checkAuthenticationAdmin, homeController.adminView);
router.get('/emp', passport.checkAuthenticationEmp, homeController.empView);
router.use('/users', require('./users'));

module.exports = router;