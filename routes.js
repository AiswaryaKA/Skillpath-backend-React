//import express library
const express = require('express')
//import userController
const userController = require('./controllers/userController')
//import courseController
const courseController = require('./controllers/coursesController')
//import jwtMiddleware for authentication of tokens
const jwtMiddleware = require('./middleware/jwtMiddleware')
//import multerConfig
const multerConfig = require('./middleware/ImgMulterMiddleware')
//import enrollmentController
const  enrollmentController  = require('./controllers/enrollmentController')

//create instance
const route = new express.Router()


//path for register
route.post('/register' , userController.registerController)

//path for login
route.post('/login',userController.loginController)

//path for google-login
route.post('/google-login' , userController.googleLoginController)

//path to get courses at home
route.get('/all-home-courses' , courseController.getHomeCoursesController)

//----------------------------------------------------------------------------------------------
//-------------------------------User-----------------------------------------------------------

//path to add course
route.post('/add-courses', jwtMiddleware ,multerConfig.array('uploadedImages' , 3) , courseController.addCourseController)

//path to get all courses
route.get('/all-courses' ,jwtMiddleware , courseController.getAllCoursesController)

//path to view a course - path parameter - :id
route.get('/view-course/:id' , courseController.getACourseController) //: inorder to identitify the parameter

//path to get all hostcourses 
route.get('/host-all-courses',jwtMiddleware, courseController.getAllHostCoursesController)

//path to post enrollment details
route.post('/enrollment' , jwtMiddleware , enrollmentController.userEnrollmentController)

//to get enrolled courses
route.get('/get-enrolled-courses' , jwtMiddleware , enrollmentController.getEnrolledCoursesContoller)

//path to upadate user profile
route.put('/user-profile-update' , jwtMiddleware , multerConfig.single('profile') , userController.editUserProfileController)

//path to bookmark
route.put('/bookmark' , jwtMiddleware , userController.BookMarkController)

//path to get bookmarkedlist
route.get('/get-bookmarked' , jwtMiddleware , userController.getBookmarkController)

//path to get allusers
route.get('/get-all-users' , userController.getAllUserController)

//path to delete enrolledCourse
route.delete('/delete-user-enrolledcourse/:id' , enrollmentController.deleteUserEnrolledCourseController)

//----------------Admin--------------------

//path for all courses admin
route.get('/admin-all-course' , jwtMiddleware , courseController.getAllCoursesAdminController)

//path to update/approve course
route.put('/approve-courses' , jwtMiddleware , courseController.getApproveCourseController)

//path to upadate admin profile
route.put('/admin-profile-update' , jwtMiddleware , multerConfig.single('profile') , userController.editAdminProfileController)

//export routes
module.exports = route 