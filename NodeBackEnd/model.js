const mongoose = require('mongoose');

var schema =  mongoose.Schema({
    Content:String,
    UserName:String,
    date:Date,
    image:String,
    title:String
});

module.exports = mongoose.model('blogSchema',schema);