const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = async(req,res) =>{
 const {username, email,password} = req.body;

 const userExists = await User.findOne({email})
 if(userExists) return res.status(400).json({message:"User already exists"});

  const user = await User.create({username,email,password})

  if(user){
   res.status(201).json({
    _id:user._id,
    username: username,
    email: user.email,
    token: generateToken(user._id)
   })
  } else{
   return res.status(400).json({message:"Invalid user data"})
  }
}

const authUser = async(req,res) =>{
 const {email,password} = req.body();

 const user = await User.findOne({email})
 if(user && user.comparePassword(password)){
  res.status(200).json({
   _id: user._id,
   username: user.username,
   email: user.email,
   token: generateToken(user._id)
  })
 }else{
  return res.status(400).json({message:"Invalid Credentials"})
 }
}

const getUserProfile = async(req,res) =>{
 const user = await User.findById(req.user.id).select('-password');
 if(user) res.json(user);
 else res.status(404).json({message: "User not found"})
}

const getAllUsers = async(req,res) =>{
 const users = await User.find().select('-password');
 res.json(users)
}

module.exports = {registerUser, authUser, getUserProfile, getAllUsers}