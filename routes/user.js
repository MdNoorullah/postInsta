require('dotenv').config()
const express = require('express')
const mongoose  = require('mongoose')
const router=express.Router()
const Post=mongoose.model("Post")
const User=mongoose.model("User")
const requireLogin=require('../middleware/requireLogin')


router.get('/user/:id',requireLogin,(req,res)=>{
   User.findOne({_id:req.params.id})//find the datais of user
   .select("-password")// in user all the stuffs but we don't want password
   .then(user=>{ 
    Post.find({postedBy:req.params.id})
    .populate("postedBy","_id name")
    // .then(mypost=>{
    //     res.json({mypost})
    // })
   // Post.find({PostedBy:req.params.id})
    //.populate("postedBy","_id name")
    .exec((err,mypost)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        return res.json({user,mypost})
    })
}).catch(err=>{
    return res.status(404).json({error:"User not found"})
   })
})
// router.get('/user/:id',requireLogin,(req,res)=>{
//     User.findOne({_id:req.params.id}).select('-password').then((user)=>{
//         Post.find({postedBy:req.params.id}).populate("postedBy","_id name").then(posts=>{
//             return res.json({user,posts})
//         }).catch(err=>{
//             console.log(err)
//         })
//     }).catch(err=>{
//         console.log(err)
//     })
// })



router.put('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id},//req.user._id is the id of the user logged    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})
router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})

router.put('/updatepic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
    })
})



module.exports=router
