const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema = new Schema({
    fileName: {type:String , required:true},
    path: {type:String , required:true},
    size: {type:Number , required:true},
    uuid: {type:String , required:true},
    senderEm: {type:String , required:false},// agar koi request karta hai ki email pe link bhejni hai tab humme ye chahiye hoga
    recieverEm: {type:String , required:false}// similarly as above
},{timestamps:true});

const File = mongoose.model('File',fileSchema);

module.exports = File;