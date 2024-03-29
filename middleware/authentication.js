const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/usersModel')


const secure = asyncHandler(async (req,res,next)=>{
let token 
if (req.headers.authorization&&req.headers.authorization.startsWith('Bearer'))
try {
    //get token from header 
    token = req.headers.authorization.split(' ')[1]

//verify the token
const decoded = jwt.verify(token,process.env.JWT_SECRET)
// get user ID from the token which is out inside the header token
req.user=await User.findById(decoded.id).select('-password')
next()


} catch (error) {
    console.log(error)
    res.status(401)
    throw new Error('not authorized')
}
if (!token) {
    res.status(401)
    throw new Error('No Token')
    
}
})


module.exports = {secure}