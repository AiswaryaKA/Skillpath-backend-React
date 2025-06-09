//import mongooose
const mongoose = require('mongoose')

//schema
const coursesSchema = new mongoose.Schema({

    coursename: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    institutename: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    noofseats: {
        type: Number,
        required: true
    },
    syllabus: {
        type: String,
        required: true
    },
    coursefee: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
     institutelink: {
        type: String,
        required: true
    },
    courseimageurl: {
        type: Array,
        required: true
    },
    uploadedimage: {
        type: Array,
        required: true
    },
    courseapprovedstatus: {
        type: String,
        default: 'pending'
    },
    userEmail: {
        type: String,
        required: true
    },
    enrolledstatus: {
        type: String,
        default: ''
    }
})


const courses = mongoose.model('courses', coursesSchema)

module.exports = courses