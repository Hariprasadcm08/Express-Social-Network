const mongoose=require('mongoose')

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    media: { type: String },
    isPublic: { type: Boolean, default: true },
    hashtags: [{ type: String }],
    friendTags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      text: { type: String },
      subComments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String }
      }]
    }],
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true });

  module.exports=mongoose.model('post',postSchema)