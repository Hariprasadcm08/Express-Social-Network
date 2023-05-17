const userModel=require('../models/userModel')
const postModel=require('../models/postModel')

const like=async function(req,res){
    try{
        const userid=req.params.userId
        const postid=req.params.postId
        const userCheck=await userModel.findOne({userId:userid})
        if(!userCheck){return res.status(404).send({message:"user not found"})}

        const postCheck= await postModel.findOne({postId:postid})
        if(!postCheck){return res.status(404).send({message:"post not found"})}

        for(let i=0;i<postCheck.likedUsers;i++){
            if(postCheck.likedUsers[i]==userid){
                return res.status(400).send({message:"you already liked this post "})
            }else{
                postCheck.likedUsers.push(userid)
            }
        }
       postCheck.likeCount+=1
       await postCheck.save()
       return res.status(201).send({message:"post liked successfully"})
}
catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


module.exports={like}