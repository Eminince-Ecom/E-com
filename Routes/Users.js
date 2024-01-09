const express = require('express');
const { registerUser, login, getUser,
 getUsers, deleteUser, updateUser} = require('../Controller/Users');
const User = require('../Model/User');
const router = express.Router();                                                                                                         
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
router.post('/login',login );
//ADMIN PANEL API"s

/*
    @usage : Get a user
    @url : /api/users/id
    @fields : 
    @method : GET
    @access : PUBLIC
 */

router.get('/:id',getUser)

/*
    @usage : Get All User
    @url : /api/users/getall
    @fields : 
    @method :GET
    @access : PUBLIC
 */
router.get('/all',getUsers)
/*
    @usage : Get All User
    @url : /api/users/getall
    @fields : 
    @method :GET
    @access : PUBLIC
 */
router.delete('/:id',deleteUser)

router.put('/:id',updateUser)
/*
    @usage : Forgot Password
    @url : /api/users/forgotpassword
    @fields : email ,otp,newpassword
    @method : POST
    @access : PUBLIC
 */
//router.post('/forgotpassword', );




module.exports=router
  
