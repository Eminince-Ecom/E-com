const express = require('express');
const {RegisterUser} = require('../Controller/Users');
const User = require('../Model/User');
const router = express.Router();

//const loginUser = require('../Controller/LoginUser');
//const forgotPassword = require('../Controller/ForgotPassword');


/*
    @usage : Register a User
    @url : /api/users/signup
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
router.post('/signup', RegisterUser);

/*
    @usage : Login a user
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
//router.post('/login', );

/*
    @usage : Forgot Password
    @url : /api/users/forgotpassword
    @fields : email ,otp,newpassword
    @method : POST
    @access : PUBLIC
 */
//router.post('/forgotpassword', );

// Add other routes as needed

module.exports=router
  
