//import dotenv library
require('dotenv').config()//load environment
//import express library
const express = require('express')
//import cors - to connect with frontend
const cors = require('cors')
//import route
const route = require('./routes')
//import db connection file
require('./databaseConnection')

//create the server using - express()
const  skillpathServer = express()

//server using cors
skillpathServer.use(cors())
//to convert/parse json data
skillpathServer.use(express.json()) //returns middleware that only parses json
//server using route
skillpathServer.use(route)
//export the uploads folder from the server side
skillpathServer.use('/upload' , express.static('./uploads')) //name to export , folder to export





//create port
PORT = 4003 || process.env.PORT

skillpathServer.listen(PORT, ()=>{
    console.log(`server running successfully at port number ${PORT}`);
    
})