const mongoose = require('mongoose');

var schema =  mongoose.Schema({
    comment:String,
    Blog_id:{type:mongoose.Schema.Types.ObjectId,ref:'blogSchema'}
    });

module.exports = mongoose.model('ComentSchema',schema);