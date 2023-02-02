const express = require('express');
const {secure} =require('../middleware/authentication')
const router = express.Router()
//requireing the controller of the create user
const {registerUser,getUserData ,loginUser}= require('../controllers/userControllers')





// create a a new user in the DB
router.post('/new', registerUser)
router.post('/login', loginUser)
router.get('/me',secure, getUserData)









module.exports=router;