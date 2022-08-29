
const express=require("express")
const mongoose=require("mongoose")
const axios=require("axios").default
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
// const fs=require("fs")

const app=express()


app.use(express.json())

const SECRET_KEY="abcd1234"
const Register_schema=mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    verifiedEmail:Boolean,
    verifyEmailOtp:Number
})

const Users=new mongoose.model("User",Register_schema)

const Register=async ()=>{
const connect=await mongoose.connect("mongodb://localhost:27017/Registration")
console.log("connected")   
}

Register()

app.get("/",(req,res)=>{
    res.send("YOu are on home page")
})

app.post("/register",async (req,res)=>{
  
    let {name,email,password}=req.body
  
    password=bcrypt.hashSync(password,10)
    console.log(password)
    const user=await new Users({
      name,
      email,
      password,
      verifyEmailOtp:crypto.randomInt(10000,100000)
    })

    await user.save()

    res.send("user added successfull")

})

app.post("/login",async(req,res)=>{

    let{email,password}=req.body
    
    let user=await Users.find({email})

    if(!user){
    //   return  res.status(404).send({response:"Bad request",
    //     message:"Email doesn't exist"})
    return res.status(404).send("user doesn't exit")
    }

    let checkPass=bcrypt.compare(password,user.password)
    // console.log(password)
    if(checkPass){
        const {name,email}=user
        let token=jwt.sign({name,email},SECRET_KEY)
        res.send(token)
    }
})

app.get("/userLoggedIn",(req,res)=>{

    let token=req.headers['auth-token']
    console.log(token)
    res.send(token)
})



app.listen(8000,()=>{
    console.log("logged in")
})