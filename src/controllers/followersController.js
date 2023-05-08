const userModel = require('../models/userModel')

const followers=async function(req,res){
    try{
        const followerId = req.params.id; // user who is following
        const followingId = req.body.id; // user being followed
        
        const follower = await userModel.findByIdAndUpdate(followerId, { $addToSet: { following: followingId }, $inc: { following: 1 } });
        await userModel.findByIdAndUpdate(followingId, { $addToSet: { followers: followerId }, $inc: { followers: 1 } });
        const updateInfo=await userModel.findOne({followerId:followerId}).select(follower.followers,follower.following)
    
        res.status(200).json({ message: `userModel ${followerId} followed userModel ${followingId}`,updateInfo });
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}



const unFollowers=async function(req,res){
    try{
        const followerId = req.params.id; // user who is unfollowing
        const followingId = req.body.userModelId; // user being unfollowed
        
        const follower = await userModel.findByIdAndUpdate(followerId, { $pull: { following: followingId }, $inc: { following: -1 } });
        await userModel.findByIdAndUpdate(followingId, { $pull: { followers: followerId }, $inc: { followers: -1 } });
        const updateInfo=await userModel.findOne({followerId:followerId}).select(follower.followers,follower.following)
        res.status(200).json({ message: `userModel ${followerId} unfollowed userModel ${followingId}`, updateInfo });
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports={followers,unFollowers}






