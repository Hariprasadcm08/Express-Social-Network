const commentModel=require('../models/commentsModel')
const userModel=require('../models/userModel')
const postModel= require('../models/postModel')


const comments = async function(req,res){
    try{
       const userid=req.params.userId
       const postid=req.params.postId
       

    }
    catch(error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports={comments}


