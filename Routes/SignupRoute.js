const { Router} =require("express")

const bcrypt=require("bcrypt")

const {UserModel}=require("../Models/userModel")

const SignupRoute=Router()

SignupRoute.post("/",async(req,res) => {

    
    try{
        const {email,password} = req.body

        const data1 = await UserModel.findOne({email:email})
        if(data1)
        {
            res.send({msg:"User already exists"})
        }else
        {
            bcrypt.hash(password, 7, async function(err, hash) {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    const data = new UserModel({email:email,password:hash})
                    await data.save()
                    res.send("After signing up successfully")
                }
            });
        }
    }
    catch(err)
    {
        console.log(err)
        res.send({msg:"Something went wrong"})
    }


   


})

module.exports={
    SignupRoute
}
