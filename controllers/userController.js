const courses = require("../model/courseModel");
const users = require("../model/userModel");
const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req, res) => {
    //logic
    const { username, email, password} = req.body
    console.log(username, email, password);

    //res.status(200).json('request received')

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(409).json('Already user Exist')
        }
        else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

//login
exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {

        const existingUser = await users.findOne({ email })

        if (existingUser) { //chech is ther the user exists
            if (existingUser.password == password) {
                // check the password id matching with the data input by user

                //generate token for verificating using sign()
                const token = jwt.sign({ userEmail: existingUser.email, userId: existingUser._id }, 'secretkey')

                res.status(200).json({ existingUser, token })
            }
            else {
                res.status(401).json('Incorrect email or password') //password does not match
            }
        }
        else {
            res.status(404).json('Incorrect email or password') //user does not exists
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

//google-login
exports.googleLoginController = async (req, res) => {
    const { username, email, password, photo } = req.body
    console.log(username, email, password, photo);

    try {

        const existingUser = await users.findOne({ email })
        //if user already exists
        if (existingUser) {
            //generate token
            const token = jwt.sign({ userEmail: existingUser.email }, 'secretkey')

            res.status(200).json({ existingUser, token })
        }
        else {
            //if newuser save the details to mongodb
            const newUser = new users({
                username,
                email,
                password,
                role: 'user',
                profile: photo
            })
            await newUser.save()
            const token = jwt.sign({ userEmail: newUser.email }, 'secretkey') //then generate token

            res.status(200).json({ existingUser: newUser, token }) // sent the res back
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//to edit user profile
exports.editUserProfileController = async (req, res) => {
    console.log('editUserProfileController');


    const { username, password, profile, bio } = req.body
    const prof = req.file ? req.file.filename : profile
    const email = req.payload.userEmail
    console.log(email);


    try {
        const userDetails = await users.findOneAndUpdate({ email }, { username, password, email, profile: prof, bio }, { new: true })
        await userDetails.save()
        res.status(200).json(userDetails)


    } catch (error) {
        res.status(500).json(error)
    }

}


//to edit admin profile
exports.editAdminProfileController = async (req, res) => {
    console.log('editAdminProfileController');

    const { username, password, profile } = req.body
    const profl = req.file ? req.file.filename : profile
    const email = req.payload.userEmail
    console.log(email);
    console.log(email);



    try {
        const adminDetails = await users.findOneAndUpdate({ email }, { username, email, password, profile: profl }, { new: true })
        await adminDetails.save()
        res.status(200).json(adminDetails)


    } catch (error) {
        res.status(500).json(error)
    }

}

//to add Bookmarked
exports.BookMarkController = async (req, res) => {

    const userId = req.payload.userId
    const { courseid } = req.body

    try {
        const user = await users.findOne({ _id: userId })

        const alreadyBookmarked = user.bookmarked.includes(courseid)

        if (alreadyBookmarked) {
            user.bookmarked = user.bookmarked.filter((id) => id !== courseid)
            await user.save()
            res.status(200).json({ bookmarked: user.bookmarked })
        }
        else {
            user.bookmarked.push(courseid)
            await user.save()
            res.status(200).json({ bookmarked: user.bookmarked })
        }


    } catch (error) {
        res.status(500).json(error)
    }
}

//to get bookmarked
exports.getBookmarkController = async (req, res) => {
    const userId = req.payload.userId
    console.log(userId);

    try {

        //get user details
        const user = await users.findOne({ _id: userId })

        //get course details
        const course = await courses.find({ _id: { $in: user.bookmarked } })

        res.status(200).json({ bookmarked: course })

    } catch (error) {
        res.status(500).json(error)
    }

}

//to get all users
exports.getAllUserController = async(req , res)=>{
    try {
        
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    } catch (error) {
       res.status(500).json(error) 
    }
}