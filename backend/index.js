const express = require('express');
const cors = require('cors');
let app = express();

app.use(cors()); 
app.use(express.json()); 

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secretkey123';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { UserModel } = require('./db');

mongoose.connect('mongodb+srv://rajdipsaha7697:Rajdip%402006@rajdip.r4ziwjt.mongodb.net/Demo')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
  app.post('/signup', async function(req,res){
  const {fullname,email,password} = req.body;
  if(!fullname || !email || !password)
    return res.status(400).json({
message:"all fields required"
   })
   try{
    const existingUser = await UserModel.findOne({email})
    if(existingUser)
        return res.json({
    message:"User Already Exist"
    })
    const passwordhash = await bcrypt.hash(password,10)
    const newUser = await UserModel.create({
        fullname,
        email,
        password:passwordhash
    })
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({
        message:"User created successfully",
        token:token,
       user:{
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email

       }
  
      })
   }
   catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
  })
  // sign in directory
  app.post('/signin',async function(req,res){
      const {fullname,email,password} = req.body;
  if(!fullname || !email || !password)
    return res.status(400).json({
message:"all fields required"
   })
   try{
         const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      message: "User signed in successfully",
      token: token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Error signing in:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
  })
  app.listen(3000, function () {
  console.log("Server started on port 3000");
});