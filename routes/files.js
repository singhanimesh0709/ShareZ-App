const express = require('express');
const router = express.Router();
const path  = require('path');
const multer = require('multer');
const File = require('../models/file');
const {v4:uuid4} = require('uuid'); // version 4 ka api's 

//making disk storage
let storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
     filename :(req,file,cb)=>{
 const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
 //424242442-2442424255.extension

      cb(null,uniqueName);
     }
    
});

//now using multer 
let upload = multer({
    storage:storage,
    limit:{fileSize:200*1048576} 
}).single('myfile');// VVV IMP*** front end se jo foem submit kar rhe hai uska name attribut yha hona chahiye
// ya fir apne insomnia ka name attribute in body should be myfile


router .post("/",(req,res)=>{

// store the file in uploads folder
upload(req,res,async (err)=>{

// validate request 
if(!req.file){
  return res.json({error : 'All fields are required'});
}

  if(err){
    return res.status(500).send({error : err.message})  
  }  
// agar error nhi hai toh nyi file ke uniqueName ya link ko database me store karenge
  //store into database
  const file = new File({
    fileName: req.file.filename, // jo uniqueNmae generate kiyaa tha wo yha mil jayega
    uuid: uuid4(),
    path: req.file.path, // path is destination/fileNmae, ye multer set karke deta hai
    size: req.file.size
  });
    
  const response = await file.save();
   res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`});
   //http://localhost:3000/files/13123414dmdlscl131312clmcscmlc 
})

//response-> link to download file 
})




module.exports = router;