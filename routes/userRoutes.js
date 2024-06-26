const express = require('express');
const { loginController, registerController, authController, applyDoctorController,getAllNotificationController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');


// router object
const router = express.Router();

// routes
// Login || POST
router.post('/login', loginController);

// Register || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData', authMiddleware, authController);

// Apply Doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// Notification Doctor || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);
module.exports = router;
