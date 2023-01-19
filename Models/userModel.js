const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:{type:String,required:true,uniqe:true},
    password:{type:String,required:true,uniqe:true},
    
})

const UserModel=mongoose.model("user1",userSchema)

module.exports={
    UserModel
}