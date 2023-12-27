const express =require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User=require('../Model/User')
const axios=require('axios')



const RegisterUser = async (req, res) => {
    const { accesstoken, provider } = req.body;
  
    try {
      let userdata;
  
      switch (provider) {
        case "google":
          const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accesstoken}`);
          userdata = googleResponse.data;
          
          break;
  
        case "linkedin":
          const linkedinResponse = await axios.get("https://api.linkedin.com/v2/me", {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          });
          userdata = linkedinResponse.data;
          break;
  
        case "github":
          const githubResponse = await axios.get("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          });
          userdata = githubResponse.data;
          break;
  
        default:
          return res.status(501).json({ message: "Error in provider" });
      }
        const existingUser = await User.findOne({ email: userdata.email });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const newUser = new User({
        name: userdata.name,
        email: userdata.email,
        avatar: userdata.avatar_url || userdata.picture, 
      });
  
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your_secret_key', {
      });
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error(error);
      res.status(502).json({ message: "Error", error });
    }
  };

  



  module.exports = RegisterUser;
  





module.exports={
    RegisterUser
}