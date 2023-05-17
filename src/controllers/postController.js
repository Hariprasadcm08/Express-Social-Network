const userModel=require("../models/userModel")
const postModel=require("../models/postModel")
const {uploadFile,updateFile}=require('../aws')

const createPost=async  function(req,res){
    try{
        let data=req.body
        let pic=req.files
        let res={}

        res.data=data
        res.pic=uploadFile(pic)
        
        let createPost=await postModel.create(res)
        return res.status(201).send({status:false,data:createPost})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const editPost=async  function(req,res){
    try{
        let userId=req.params.userId
        let postId=req.params.postId
        let data=req.body
        let pic=req.files
        let res={}
        let postCheck=await postModel.findOne({postId:postId})
        if(postCheck.user!==userId){
            return res.status(400).send({message:"you are not allowed to edit the post"})
        }
       res.data=data
       res.pic=updateFile(pic)

       let updatePost=await postModel.findByIdAndUpdate({postId:postId},{$set:{data:data}},{$set:{media:pic}})
        return res.status(201).send({status:false,data:updatePost})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


const deletePost=async  function(req,res){
    try{
       let userId=req.params
       let postId=req.params

       await postModel.findByIdAndUpdate({ isDeleted:true})
       res.status(200).send({status:true,message:"post deleted successfully"})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}




module.exports={createPost,editPost,deletePost}

