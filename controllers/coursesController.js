const courses = require("../model/courseModel");

//to add courses
exports.addCourseController = async (req, res) => {
    console.log('inside addcoursecontroller');
    // console.log(req.body);//text content
    // console.log(req.files); // uploaded content
    //acess body
    const { coursename, description, institutename, location, mode, duration, noofseats, syllabus, coursefee, category, institutelink, courseimageurl } = req.body

    console.log(coursename, description, institutename, location, mode, duration, noofseats, syllabus, coursefee, category, institutelink, courseimageurl);

    //access files
    uploadedimage = []

    req.files.map((item) => uploadedimage.push(item.filename))
    console.log(uploadedimage);

    const email = req.payload.userEmail
    console.log(email);



    try {

        const existingCourse = await courses.findOne({ coursename, userEmail: email })
        if (existingCourse) {
            res.status(401).json('You have already added this course')
        }
        else {
            const newCourse = new courses({
                coursename, description, institutename, location, mode, duration, noofseats, syllabus, coursefee, category, institutelink, courseimageurl, uploadedimage, userEmail: email
            })
            await newCourse.save()
            res.status(200).json(newCourse)
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

//to get courses in home page
exports.getHomeCoursesController = async (req, res) => {

    try {

        const allHomeCourses = await courses.find().sort({ _id: -1 }).limit(4) //to get last added courses
        res.status(200).json(allHomeCourses)

    } catch (error) {
        req.status(500).json(error)
    }
}

//to get courses at explore
exports.getAllCoursesController = async (req, res) => {

    //query parameter - for search
    console.log(req.query);
    const searchKey = req.query.search
    //to display only courses added by other users
    const email = req.payload.userEmail


    try {

        const query = {

            $or: [{
                coursename: {
                    //mongodb operator - regular expression - $regex , case sentivity avoid - $options:"i"
                    $regex: searchKey, $options: "i"
                }
            },
            {
                location: {
                    $regex: searchKey, $options: "i"
                }
            },
            {
                mode: {
                    $regex: searchKey, $options: "i"
                }
            }],
            userEmail: { $ne: email }

        }

        const allCourses = await courses.find(query)
        res.status(200).json(allCourses)

    } catch (error) {
        res.status(200).json(error)
    }
}

//to get a particular course
exports.getACourseController = async (req, res) => {



    //to access the data sent in path - parameter 
    const { id } = req.params
    console.log(id);


    try {

        const aCourse = await courses.findOne({ _id: id })
        res.status(200).json(aCourse)

    } catch (error) {
        res.status(500).json(error)
    }
}




//--------------------Admin-------------------------

//to get all Courses for admin
exports.getAllCoursesAdminController = async (req, res) => {
    try {
        const existingCourses = await courses.find()
        res.status(200).json(existingCourses)
    } catch (error) {
        res.status(500).json(error)
    }
}

//to approve a course
exports.getApproveCourseController = async(req , res)=>{
    const {_id , coursename, description, institutename, location, mode, duration, noofseats, syllabus, coursefee, category, institutelink,courseapprovedstatus, courseimageurl ,uploadedimage} = req.body

    console.log(_id , coursename, description, institutename, location, mode, duration, noofseats, syllabus, coursefee, category, institutelink,courseapprovedstatus, courseimageurl ,uploadedimage);
    
    try {
        //findbyidandupdate - only id can be given as condition
        const existingCourse  = await courses.findByIdAndUpdate({_id},{_id , coursename, description, institutename, location, mode, duration, noofseats, syllabus, coursefee, category, institutelink,courseapprovedstatus:'approved', courseimageurl ,uploadedimage} , {new:true}) // new:true - to save new data to mongodb

        await existingCourse.save()
        res.status(200).json(existingCourse)
        
    } catch (error) {
        res.status(500).json(error)
    }

}

//to get approved courses in hosts dashboard
exports.getAllHostCoursesController = async (req , res)=>{
    const email = req.payload.userEmail
    try {

        const approvedCourses = await courses.find({userEmail:email})
        res.status(200).json(approvedCourses)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
}