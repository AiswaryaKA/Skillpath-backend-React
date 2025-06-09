//import mongoose
const mongoose = require('mongoose')

//schema
const enrolledSchema = new mongoose.Schema({

    userid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    hostemail: {
        type:String,
        required: true
    },
    courseid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses",
        required: true
    },
    fullname: {
        type:String,
        required: true
    },
    qualification: {
        type:String,
        required: true
    },
    questions: {
        type:String,
        default: ''
    },
    enrollmentfee:{
        type:Number,
        default:500
    }
})

//create model
const enrolled = mongoose.model('enrolled', enrolledSchema)

module.exports = enrolled