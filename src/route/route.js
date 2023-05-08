const express=require('express')
const router=express.Router()
const {createPost,editPost,deletePost}=require('../controllers/postController')
const {createUser,getData,updateUser,login}=require('../controllers/userController')
const {followers,unFollowers}=require('../controllers/followersController')


module.exports=router