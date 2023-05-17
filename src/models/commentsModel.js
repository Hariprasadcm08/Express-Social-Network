const mongoose=require('mongoose')

const commentSchema = new mongoose.Schema({
    userId: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    content: String,
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    nestedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  });


  module.exports=mongoose.model('Comment',commentSchema)