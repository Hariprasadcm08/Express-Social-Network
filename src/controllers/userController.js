const userModel=require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {isValidEmail,isValidPswd,isValidPhone}=require("../validators")


const createUser=async function(req,res){
    try{
    let data=req.body
    let {name,password,email,username,gender,mobile}=data
    if(Object.keys(data).length==0)return res.status(400).send({status:false,msg:"can't create data with empty body"})

       let newArr=["name","password","email","mobile","password","username","gender"]
       for(i of newArr){
        if(!data[i])return res.status(400).send({status:false,msg:` ${i} is mandatory please input ${i}`})
       }


        let array=Object.keys(data)
        for(i of array){
         if(data[i].trim()=="")return res.status(400).send({status:false,msg:` ${i} can't be empty`})
        }
    password = await bcrypt.hash(password, 10)
    let create=await userModel.create(data)
    return res.status(201).send({status:true,message:"user registered successfully",data:create})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


const getData=async function(res,req){
    try{
        let userId=req.params
        
        let findUser=await userModel.findOne({userId:userId},{isDeleted:false})
        if(!findUser){
            return res.status(404).send({status:false,message:"user not found"})
        }
        else{
            return res.status(200).send({status:true,data:findUser})
        }
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const updateUser=async function(req,res){
    try{
    let userId=req.params
    let data=req.body
    let checkUser=await userModel.findOne({userId:userId},{isDeleted:false})
    if(!checkUser){return res.status(404).send({status:false,message:"user not found"})}
    if(Object.keys(data).length==0)return res.status(400).send({status:false,msg:"can't update data with empty body"})
      let updateData=await userModel.findByIdAndUpdate({userId:userId},{$set:{data}})
      return res.status(200).send({status:true,message:"user data updated successfully",data:updateData})
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const login=async function(req,res){
    try{
        let data= req.body
        let  {email,password,mobile}=data
            if(Object.keys(req.body).length==0){
                return res.status(400).send({status:false,message:"can not login without credentials"})
            }
            if (data.hasOwnProperty("email") && data.hasOwnProperty("phone") ) {return res.status(400).send({ status: false, message: "please provide any one between email and phone no" })}
            if (!data.hasOwnProperty("email")) {
            if (!data.hasOwnProperty("mobile")) {return res.status(400).send({status: false,message: "please enter mobile no or email id to login"})}}
            if (!data.hasOwnProperty("password")) {return res.status(400).send({ status: false, message: "please enter password to login" })}
        
          
           if(email){
            if(!isValidEmail(email.trim())){return res.status(400).send({status:false,message:"Email is invalid"})}}
           
        if(phone){
            if(!isValidPhone(phone.trim()))return res.status(400).send({status:false,msg:"please enter a valid phone No"})
        }
            let findUser= await userModel.findOne({$or: [{ email: data.email },{ phone: data.phone}]})
            if(!findUser){return res.status(404).send({status:false,message:"User not found"})}
            let hash= findUser.password
            let bcryptpwd= await bcrypt.compare(password.trim(), hash)
            if(!bcryptpwd){return res.status(400).send({status:false,message:"please put correct password "})}
           
        
            let token= jwt.sign({userId:findUser._id},"node api's",{expiresIn:"10d"})
           let obj= {userId:findUser["_id"],token}
        
            return res.status(200).send({status:true,message:"User login successfull",data:obj})
     }
     catch(error){
            return res.status(500).send({status:false,message:error.message})
        }
    }

const blockUser=async function(req,res){
    try{

    }
    catch(error){
        return res.status(200).send({status:false,message:error.message})
    }
}

const unBlockUser=async function(req,res){
    try{

    }
    catch(error){
        return res.status(200).send({status:false,message:error.message})
    }
}


    module.exports={createUser,getData,updateUser,login,blockUser,unBlockUser}
