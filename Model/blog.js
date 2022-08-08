const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// this is Constructor Function

//this will create a new instance of schema object. then we create a Schema
const blogSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    snippet: {
        type: String,
        required:true
    },
    body: {
        type: String,
        required:true
    }
},{timestamps:true});

//Schema defines the structure of our document.

// model based on schema surround that schema and provide a interface to communicate with a database
// collection for that document type


// first arg is name of modal and Important because it will plurize this name and automatically look for the collection
// named blogs so we dont have to say look for collections blogs.
const Blog = mongoose.model('Blog',blogSchema)
// name should be single of collection name ex: collectionname=blogs , modalname= blog



module.exports = Blog;


