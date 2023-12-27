const express=require('express')
const RegisterUser=require('../Controller/Users')
const LoginUser=require('../Controller/Users')
const router=express.Router()



router.post('/signup',RegisterUser)

/*
    @usage : Register a User
    @url : /api/users/register
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */

    router.post('/login',LoginUser)
/*
    @usage : Login a user
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */

    router.post("/forgotpassword")
/*
    @usage : Forgot Password
    @url : /api/users/forgotpassword
    @fields : email ,otp,newpassword
    @method : POST
    @access : PUBLIC
 */

    router.post('/changepassword',LoginUser)
/*
    @usage : to change the user's password
    @url : /api/users/changepassword
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */
module.exports=Users;