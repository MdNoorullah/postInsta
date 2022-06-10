require('dotenv').config()
const express = require('express')
const mongoose  = require('mongoose')
const bcrypt=require('bcryptjs');
const router=express.Router()
const jwt=require('jsonwebtoken')

const requireLogin=require('../middleware/requireLogin')
const {JWT_SECRET} =  require('../config/keys')
const User=mongoose.model("User")

router.get('/',(req,res)=>{
    res.send("hello")
})

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("hello user")
// })

router.post('/signup',(req,res)=>{
   const {name,email,pic}=req.body
   const password=req.body.Password
  
   if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"})
   }
   //res.json({message:"successfuly posted"})
   User.findOne({email:email})
   .then((savedUser)=>{
      if(savedUser)
      {
        return res.status(422).json({error:"user already exists with that email"})
      }
      // for more secure more bigger the number in hash
     bcrypt.hash(password,12)
     .then(hashedpassword=>{
        const user=new User({
            email,
            password:hashedpassword,
            name,
            pic
        })
  
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err);
        })
     })
     })
      
.catch(err=>{
    console.log(error);
})
})

router.post('/signin',(req,res)=>{
  const {email}=req.body;
  const password=req.body.Password;
  
  if(!email || !password)
  {
      return res.status(422).json({error:"please add email or password"})
  }
    User.findOne({email:email})
      .then(savedUser=>{
          if(!savedUser)
          {
              return res.status(422).json({error:"Invalid Email or password"})
          }
         
          bcrypt.compare(password,savedUser.password)
          .then(doMatch=>{
              if(doMatch)
              {//res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET) 
               const {_id,name,email,followers,following,pic}=savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
             }
              else{
                  return res.status(422).json({error:"Invalid Email or password"})
              }
          })
          .catch(err=>{
              console.log(err);
          })
      })
  })

module.exports=router
