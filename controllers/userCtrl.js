const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/DoctorModel')
// register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: 'User Already Exist', success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register controller ${error.message}` });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in login CTRL ${error.message}` });
  }
};

// auth callback
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({ message: 'User not found', success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Auth error', success: false, error });
  }
};


// apply doctor
const  applyDoctorController = async (req,res) => {
  try {
    const newDoctor = await doctorModel({...req.body, status:'pending'})
    await newDoctor.save()
    const adminUser = await userModel.findOne({isAdmin:true})
    const notification = adminUser.notification
    notification.push({
      type:'apply-doctor-request',
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied for a doctor account `,
      data:{
        doctorId:newDoctor._id,
        name: newDoctor.firstName + "" + newDoctor.lastName,
        onClickPath:'/admin/doctors'
      }
    })
    await userModel.findByIdAndUpdate(adminUser._id, { notification })
    res.status(201).send({
      success:true,
      message:'Doctor Account Applied Successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while Applying for doctor'
    })
  }


};


//notification controller

const getAllNotificationController = async (req,res) =>{
 
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    const seennotification = user.seennotification;
    const notification = user.notification
    seennotification.push(...notification)
    user.notification = []
    user.seennotification = notification
    const updatedUser = await user.save()
    res.status(200).send({
      success: true,
      message: 'all notification marked as read',
      data: updatedUser,
    });
    
  } catch (error) {
    consol.log(error)
    res.status(500).send({
      message:'Error in notification',
      success: false,
      error

    })
    
  }
}


//delete notification
const deleteAllNotificationController = async (req,res) => {
   try {
    const user = await userModel.findOne({_id:req.body.userId})
    user.notification = []
    user.seennotification = []
    const updatedUser = await user.save()
    updatedUser.password = undefined
    res.status(200).send({
      success:true,
      message:'Notification Deleted successfully',
      data: updatedUser,
    })
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'unable to delete all notification',
    })
    
   }

};

//GET ALL DOC
const getAllDoctorsController = async (req,res) => {
  try{
    const doctors = await doctorModel.find({status:'approved'})
    res.status(200).send({
      success:true,
      message:'Doctors Lists Fetched Successfully',
      data:doctors,
    })
  }catch (error){
     console.log (error)
     res.status(500).send({
      success:false,
      error,
      message:'Error While Fetching Doctor'
     })
  }
}

module.exports = { loginController, registerController, authController ,  applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController };
