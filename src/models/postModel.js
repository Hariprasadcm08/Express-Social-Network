const mongoose=require('mongoose')

const postSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User',required: true },
    text: {type:String},
    media: { 
      type: String,
      required:true
      },
    isPublic:{type: Boolean, default: true},
    hashtags:[{ type: String }],
    friendTags:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likedUsers:{
      type: Array,
      default: []
    },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
   isDeleted: { type: Boolean, default: false }
  }, { timestamps: true });

  module.exports=mongoose.model('Post',postSchema)