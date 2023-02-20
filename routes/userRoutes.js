const express=require("express");
const {Usermodel}=require("../model/Usermodel")
const userRouter=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
require("dotenv").config();
userRouter.post("/register",async(req,res)=>{
    const {name,password,age,email,gender,city}=req.body;
    let temp=await Usermodel.find({email});
    if(temp.length>0){ 
        res.send({"msg":"User already exist, please login"});
    }else{
        try{
            bcrypt.hash(password, 5,async (err, hash) => {
                try{
                    const user=new Usermodel({name,password:hash,age,email,gender,city});
                    await user.save();
                    res.send("Registered successfully");
                }
                catch(err){
                    res.send(`something went wrong":${err.message}`)
                }
            }); 
        }catch(err){
           
            res.end({"error":err})
        }
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await Usermodel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(result){
                 let token=jwt.sign({userID:user[0]._id},process.env.tokenKEY)
                
                 res.send({"msg":'login successfull',"token":token})
                }else{                   
                    res.send({"msg":"wrong password"});
                }
             });
        }else{         
            res.send("Incorrect email")
        }
    }catch(err){     
       res.send({"msg":err})
    }
})

module.exports={
    userRouter
}
