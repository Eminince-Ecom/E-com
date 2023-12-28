const express =require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User=require('../Model/User')
const axios=require('axios')
const jwts=require('../Config')

const registerUser = async (req, res) => {
  const { email, name, picture ,password} = req.body;

  if (!email || !name) {
    res.status(502).json({ message: "Please provide proper details" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(503).json({ message: "User already exists" });
      return;
    }
    
    const hasshedpassword=  await password? bcrypt.hash(password,10):undefined

    const avatar = picture || `https://www.gravatar.com/avatar/${Math.floor(Math.random() * 1000000)}?d=robohash`;

    const newUser = new User({
      name: name,
      email: email,
      avatar:avatar,
      password:hasshedpassword
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, 8707);
    res.status(201).json({ message: "User Registration Successful", token });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Error in the API" });
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
    const token = jwt.sign({ userId: user._id, email: user.email }, "8707", );
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//ADMIN PANEL API

const getUser = async (req, res) => {
  console.log(2447686, "--------------------------------------------------id");

  const userId = req.params.id;
  console.log(userId, 2447686, "--------------------------------------------------id");

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
    res.status(500).json({ message: "Internal server error" });
  }
};



const getUers=async(req,res)=>{
  console.log(" good -> getusers is working -> ");
  try {
   const allusers=await User.find() 
   res.status(200).json({messsage:allusers})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:error})
  }
}


const deleteUser=async(req,res)=>{
const userId=req.params.id
try {
  const user=await User.findById(userId)
if(!user){
  res.status(402).json({message:"User not found"})  
}
await User.findByIdAndDelete(userId)
res.status(200).json({message:"User Deleted Succesfully"})
console.log(error)
} catch (error) {
  console.log(Error)
  res.status(400).json({message:"Error in Delete Api"})
}}

const updateUser=async(req,res)=>{
  const userId=req.params.id
  try {
    
const user =await User.findByIdAndUpdate(userId)
if(!user){
  res.status(500).json({message:"User Does not Exist"})
}

user.name=req.body.name
user.email=req.body.email

if(avatar){
  user.avatar=req.body.avatar
}
const updateUser=await User.save()

res.status(201).json({message:"User Updated Successfully",updateUser})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Error in Update User"})
  }
}


module.exports={
    registerUser,login,getUser,
    getUers,updateUser,deleteUser
}