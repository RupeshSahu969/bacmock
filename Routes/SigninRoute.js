const {Router} =require("express")

require("dotenv").config()

const bcrypt=require("bcrypt")

const {UserModel}=require("../Models/userModel")

const SigninRouter=Router()

var jwt=require("jsonwebtoken")

SigninRouter.post("/", async(req,res) =>{

    try{
        const {email,password} = req.body

        const dataItem = await UserModel.findOne({email:email})
        if(dataItem)
        {
            const hash = dataItem.password
            const email = dataItem.email

            bcrypt.compare(password, hash, function(err, result) {
                if(err)
                {
                    console.log(err)
                    res.send({msg:"Something  worng"})
                }
                if(result)
                {
                    jwt.sign({ email: email }, process.env.KEY,async function(err, token) {
                        if(err)
                        {
                            res.send({msg:"wrong"})
                        }else
                        {
                            res.send({msg:"Login sucessfull",token:token})
                        }
                    });
                }else
                {
                    res.send({msg:"Invalid Credentials"})
                }
            });
        }else
        {
            res.send({msg:"Invalid Credentials"})
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"Somethong  wrong"})
    }


})


module.exports={
    SigninRouter
}