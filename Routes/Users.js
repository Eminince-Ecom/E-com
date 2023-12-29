const express = require('express');
const { registerUser} = require('../Controller/Users');
const User = require('../Model/User');
const router = express.Router();

//const loginUser = require('../Controller/LoginUser');
//const forgotPassword = require('../Controller/ForgotPassword');
                                                                                                                       

//router.post('/signup',RegisterUser)

/*
    @usage : Register a User
    @url : /api/users/signup
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
router.post('/register', registerUser);

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
  
