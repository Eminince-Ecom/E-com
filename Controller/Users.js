const express =require('express')
//const jwtkey='8707'
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const User=require('../Model/User')
const axios=require('axios')
const registerUser = async (req, res,next) => {
  try {
  const { email, name, picture, password } = req.body;

  if (!email || !name) {
    res.status(502).json({ message: "Please provide proper details" });
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    res.status(502).json({ message: "Invalid email format. Please provide a valid email address." });
    return;
  }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(503).json({ message: "User already exists" });
      return;
    }
    let hashedPassword;
    let registerType
    if (!password) {
      registerType= 'Social';
     const randomPassword = Math.random().toString(36).slice(-8);
     hashedPassword = await bcrypt.hash(randomPassword, 10);
      
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const avatar = picture || `https://www.gravatar.com/avatar/${Math.floor(Math.random() * 1000000)}?d=robohash`;
    const newUser = new User({
      name: name,
      email: email,
      avatar: avatar,
      password: hashedPassword,
      registerType:registerType
    });

    await newUser.save();
    const token = jwt.sign({},process.env.JWT);
    res.status(201).json({ message: "User Registration Successful", token });
  } catch (err) {
    next(err)
  }
}

const login =async(req,res)=>{
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Please provide email for login' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }
    const token = jwt.sign({},process.env.JWT);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//ADMIN PANEL API

const getUserById = async (req,res) => {
   const userId = req.params.id;


  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID. Please enter a valid ID." });
  }
  try {


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
    console.log(userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    next(err)
  }
};

const getAllUsers=async(req,res,next)=>{
  console.log('099989898');
  try {
  const all =await User.find().limit(10)
  console.log(all,'allallall');
  res.status(200).json({message:all})
  } catch (error) {
    next(err)
  }
}

const deleteUser=async(req,res,next)=>{
const userId=req.params.id

if (!mongoose.Types.ObjectId.isValid(userId)) {
  return res.status(400).json({ error: "Invalid user ID. Please enter a valid ID." });
}
try {
  const user=await User.findById(userId)
if(!user){
  res.status(402).json({message:"User not found"})  
}
await User.findByIdAndDelete(userId)
res.status(200).json({message:"User Deleted Succesfully"})
console.log(error)
} catch (err) {
  next(err)
}}


const updateUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID. Please enter a valid ID." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!req.body.email || !emailPattern.test(req.body.email)) {
    return res.status(400).json({ error: "Invalid email format. Please enter a valid email address." });
  }
  try {
    const user = await User.findByIdAndUpdate(userId, {
      name: req.body.name,
      email: req.body.email,
    }, { new: true }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

module.exports={
    registerUser,login,getAllUsers,
    getUserById,updateUser,deleteUser
}