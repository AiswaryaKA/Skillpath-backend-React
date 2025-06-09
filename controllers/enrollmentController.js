const courses = require("../model/courseModel");
const enrolled = require("../model/enrollmentModel");
const stripe = require('stripe')(process.env.SECRETKEY)

//enrollment
exports.userEnrollmentController = async (req, res) => {

    const { courseid, hostemail, fullname, qualification, questions , enrollmentfee} = req.body
    console.log(courseid, hostemail, fullname, qualification, questions , enrollmentfee);
    const userid = req.payload.userId

    try {
        //to get course details
        const courseDetails = await courses.find({ _id: courseid })
        console.log(courseDetails);




        const newEnrollment = new enrolled({
            userid,
            hostemail,
            courseid,
            fullname,
            qualification,
            questions ,
            enrollmentfee
        })
        await newEnrollment.save()

        // Create Stripe checkout session for payment
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Course enrollment: ${courseDetails.coursename}`,
                        },
                        unit_amount: Math.round(enrollmentfee* 100), // INR in paise, so multiply by 100
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url:
                "https://skillpath-frontend-react.vercel.app/paymentsuccess",
            cancel_url: "https://skillpath-frontend-react.vercel.app/paymenterror",
            metadata: {
                userid,
                hostemail,
                courseid,
                fullname,
                qualification,
                questions ,
                enrollmentfee
            },
        });

        res.status(200).json({newEnrollment, sessionId:session.id})

    } catch (error) {
        res.status(500).json(error)
    }
}

//to get enrolled courses for users
exports.getEnrolledCoursesContoller = async(req , res) =>{
    const userid = req.payload.userId
    try {
         const userPurchase = await enrolled.find({userid}).populate('courseid')
         res.status(200).json(userPurchase)
    } catch (error) {
        res.status(500).json(error)
    }
}

//to delete user enrolled course details
exports.deleteUserEnrolledCourseController = async(req , res)=>{
    const {id} = req.params
    console.log(id);

    try {

        await enrolled.findByIdAndDelete({_id:id})
        res.status(200).json('Delete Successfull')
        
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}