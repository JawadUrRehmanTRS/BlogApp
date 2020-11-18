const { json } = require('body-parser');

const multer = require('multer');
const path = require('path');

const express = require('express');

const router = express.Router();

var Blog = require('./model');

router.get('/blogs',(req,res,next)=>{
    Blog.find((err,docs)=>{
        res.json(docs);
    });
});


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/file',upload.single('file'),(req,res,next)=>{
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

  router.post('/blog', upload.single('file'),(req,res,next)=>{
    const file = req.file;
    const filePath = req.file.filename; 
    console.log(filePath);
 
    
    let blog = new Blog({
        Content:req.body.Content,
        UserName:req.body.UserName,
        image:req.body.image,
        date:Date.now(),
        title:req.body.title
    })
    
    
    blog.save((err)=>{
        if(err)
            res.json(err)
        else
            res.json({msg:"blog added sucessfully"})
    });

    
});


router.get('/blog/:id',(req,res)=>{
    Blog.findById({_id:req.params.id},(err,docs)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(docs);
        }
    })
});

router.put('/blog/:id',(req,res)=>{
    let update ={
        Content:req.body.Content,
        image:req.body.image,
        title:req.body.title,
        UserName:req.body.UserName,
    } 
    Blog.findByIdAndUpdate({_id:req.params.id},update,(err)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({msg:'update successfully'});
        }
    })
});


router.delete('/blog/:id',(req,res)=>{
    Blog.findByIdAndDelete({_id:req.params.id},(err)=>{
        if(err)
        res.json(err);
        else
        res.json({msg:"delete Sucessfully"})
    })
});




module.exports = router;