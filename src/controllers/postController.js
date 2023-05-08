const userModel=require("../models/userModel")
const postModel=require("../models/postModel")
const {uploadFile}=require('../aws')

const createPost=async  function(req,res){
    try{
                                 
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const editPost=async  function(req,res){
    try{
       
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


const deletePost=async  function(req,res){
    try{
       
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


module.exports={createPost,editPost,deletePost}

