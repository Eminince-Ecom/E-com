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
const {email,password}=req.body
  try {
const user = User.findOne({email})
if(!user){
  res.status(502).json({message:"User Not Found Please regisster First"})
}
if(user.password){
  passwordmatch=bcrypt.compare(password,user.password)
}


    
  } catch (error) {
    console.log(error)
    res.status()
  }
}












module.exports={
    registerUser
}