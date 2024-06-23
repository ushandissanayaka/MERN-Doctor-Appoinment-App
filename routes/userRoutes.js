const express = require('express')
const { loginController, registerController } = require('../controllers/userCtrl')

//router onject
const router = express.Router()

//routes
//Login || post
router.post('/login' , loginController)

//Register || post
router.post('/regster', registerController)
module.exports = router