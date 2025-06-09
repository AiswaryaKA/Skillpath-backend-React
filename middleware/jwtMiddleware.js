//import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {

    console.log('inside jwtMiddleware')
    const token = (req.headers.authorization).split(' ')[1]
    console.log(token);

    //to verify token
    try {
        const jwtResponse = jwt.verify(token ,  'secretkey') //verify the token using verify method
        console.log(jwtResponse);//verified-succesful-we get an obj
        //add a new data to req 
        req.payload = jwtResponse
        
         next() //goes control to controller
        
    } catch (error) {
       res.status(401).json('Invalid token' , error) 
    }
    
   
}



module.exports = jwtMiddleware