const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const routes = require('./routes/files');

const PORT = process.env.PORT || 3000;
 
//************ iss application me  database ka connection multiple jagah chahiye hoga,
// issliye hum db ka setup ek alag file me hi karenge
const connectDB = require('./config/db');
connectDB(); // wha se humne function export ki thii, toh yha pe hum  usse call bhi toh karenge

app.use(express.static('public'));
//Routes
app.use('/api/files',routes);

app.listen(PORT,()=>{
    console.log(`listening on port: ${PORT}`);
})





