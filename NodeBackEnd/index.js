const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const app = express();


const route = require('./route');
app.use(bodyParser.json());



app.use(express.static('./uploads'));

mongoose.connect('mongodb://localhost:27017/BlogDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected',function(){
    console.log("mongoDb connected")
});

mongoose.connection.on('error',function(err){
    if(err)
    console.log("error Connection",err)
});




app.use(cors());

app.use('/',route);


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })


app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    const filePath = req.file.path; 
    console.log(filePath);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })





app.listen(3000,function(){
    console.log("listening at 3000")
});

