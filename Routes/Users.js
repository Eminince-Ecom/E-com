const express = require('express');
const {RegisterUser} = require('../Controller/Users');
const User = require('../Model/User');
const router = express.Router();

//const loginUser = require('../Controller/LoginUser');
//const forgotPassword = require('../Controller/ForgotPassword');




router.post('/signup',RegisterUser)

/*
    @usage : Register a User
    @url : /api/users/signup
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
<<<<<<< HEAD
router.post('/signup', RegisterUser);

=======

    router.post('/login',LoginUser)
>>>>>>> a659e423d78bc4875889d0ada434a9af481834a1
/*
    @usage : Login a user
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
//router.post('/login', );

<<<<<<< HEAD
=======
    router.post("/forgotpassword")
>>>>>>> a659e423d78bc4875889d0ada434a9af481834a1
/*
    @usage : Forgot Password
    @url : /api/users/forgotpassword
    @fields : email ,otp,newpassword
    @method : POST
    @access : PUBLIC
 */
//router.post('/forgotpassword', );

<<<<<<< HEAD
// Add other routes as needed

module.exports=router
  
=======
    router.post('/changepassword',LoginUser)
/*
    @usage : to change the user's password
    @url : /api/users/changepassword
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
module.exports=Users;
>>>>>>> a659e423d78bc4875889d0ada434a9af481834a1
