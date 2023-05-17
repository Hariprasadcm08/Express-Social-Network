const aws = require("aws-sdk")
const userModel=require('./models/userModel')

aws.config.update({
    accessKeyId :"AKIAY3L35MCRZNIRGT6N",
    secretAccessKey : "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",
    region : "ap-south-1"
})

const uploadFile = function(file){
  
    return new Promise((resolve, reject)=>{
        let s3 = new aws.S3({apiVersion:"2006-03-01"})
        let uploadParams = {
            ACL : "public-read",
            Bucket: "classroom-training-bucket",
            Key : "cover/" + file.originalname,
            Body: file.buffer
        }
        
        s3.upload(uploadParams, (err, url)=>{
            if(err){return reject (err)}
        
            return resolve (url.Location)
        })
    })
}

//=================================update image in aws bucket===============================//
const updateFile = (file, id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userModel.findOne({ _id: id });
        if (!user || user.role !== "user") {
          throw new Error("User not found or not authorized");
        }
  
        if (user.imageUrl) {
          const oldKey = user.imageUrl.split("/").pop();
          await deleteFile(`cover/${oldKey}`);
        }
  
        const newKey = `${id}-${file.originalname}`;
        const imageUrl = await uploadFile(file, newKey);
        user.imageUrl = imageUrl;
        await user.save();
        
        resolve(imageUrl);
      } catch (error) {
        reject(new Error(error.message));
      }
    });
  };


  //===========================fetch image from aws bucket=============================//
   
  const getFile = function(file) {
    return new Promise((resolve, reject) => {
        let getParams={
            ACL : "public-read",
            Bucket: "classroom-training-bucket",
            Key : "cover/" + file.originalname,
            Body: file.buffer
        }
  
      s3.getObject(getParams, (err, data) => {
        if (err) {
          return reject(err);
        }
  
        return resolve(data.Body);
      });
    });
  };

module.exports = {uploadFile,updateFile,getFile}