//import mongoose
const mongoose = require('mongoose')

//create schema

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
       default:"user"
    },
    profile:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:'Skillpath user'
    },
    bookmarked:{
        type:Array,
        default:""
    }
})

const users = mongoose.model("users",userSchema)
module.exports = users