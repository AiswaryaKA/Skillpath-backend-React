//import multer
const multer = require('multer')

//diskstorage obj with 2 key
const storage = multer.diskStorage({
    //set the path to store the uploaded file
    destination:(req , file , callback)=>{
        callback(null , './uploads')
    },
    //name to store the file
    filename:(req , file , callback)=>{
         const fname = `image-${file.originalname}`
        callback(null , fname)
    }
})

//which files should accept
const fileFilter = (req , file , callback)=>{
    //accepts only png , jpg , jpeg
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        callback(null , true) //accepts
    }
    else{
        callback(null , false) //rejects
        return callback(new Error('accept only png , jpg , jpeg files')) //error
    }
}

//create multer config
const multerConfig = multer({
    storage,
    fileFilter
})
//to use multer middleware
module.exports = multerConfig