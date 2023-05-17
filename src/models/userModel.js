const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
   
    password:{ 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required:true,
        unique: true
    },
    username: { 
        type: String, 
        unique: true, 
        required: true
     },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'],
        require:true
    },
    mobile: { 
        type: String, 
        required: true, 
        
    },
    followers:{
        type:Number,
        default:0
    },
    following:{
        type:Number,
        default:0
    },
    isPrivate: { 
        type: Boolean, 
        default: false 
    },
    isBlock:{
     type:Boolean,
     default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})
module.exports=mongoose.model('User',userSchema)