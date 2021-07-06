const mongoose = require('mongoose');
require('dotenv').config();
const dbURI =process.env.dbURI;
function connectDB(){

    //Database Connection
    mongoose.connect(dbURI,{useNewUrlParser:true,useCreateIndex:true,
        useUnifiedTopology:true, useFindAndModify:true});
     const connection = mongoose.connection;
     connection.once('open',()=>{
         console.log('Database connected');
     }).catch(err=>{
         console.log('Connection failed');
     }) 


}

module.exports = connectDB;