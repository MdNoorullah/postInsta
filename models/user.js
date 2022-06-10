const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    pic:{
       type:String,
       default:"https://res.cloudinary.com/dranm/image/upload/v1654778705/noImage_nbxegr.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]

})

mongoose.model("User",userSchema)
//as we are not exporting so no return type we should use