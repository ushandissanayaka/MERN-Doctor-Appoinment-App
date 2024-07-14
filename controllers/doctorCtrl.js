const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/DoctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async (req,res) => {
 try{
    const doctor = await doctorModel.findOne({userId: req.body.userId});
    res.status(200).send({
        success:true,
        message:'doctor data fetch success',
        data : doctor
    })
 }catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error in fetching Doctor Details'
    });
 }
};

//update doc profile
const updateProfileController = async (req,res) => {
    try{
           const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body)
           res.status(201).send({
            success:true,
            message:'Doctor Profile Updated', 
            data:doctor,
           })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Doctor Profile Update issue',
            error
        })
    }
};

//get single doctor
const getDoctorByIdController = async (req,res) => {
    try{
       const doctor = await doctorModel.findOne({_id:req.body.doctorId})
       res.status(200).send({
        success:true,
        message:'Single Doc Info fetched',
        data:doctor,
       })
    }catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        error,
        message:'error in single doctor info'
       })
    }
};

//doctor appoinments
const  doctorAppoinmentController = async (req,res) => {
try {
     const doctor = await doctorModel.findOne({userId: req.body.userId })
    const appoinments = await appointmentModel.find({
        doctorId: doctor._id,

    });
    res.status(200).send({
        success: true,
        message: "Doctor appoinments fetch successfully",
        data: appoinments,
    });
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error in doc appoinment'
    })
}
};

const updateStatusController = async (req,res) => {
    try {
      const {appointmentsId, status} = req.body
      const appoinments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
      const user = await userModel.findOne({_id: appoinments.userId})
      const notification = user.notification;

      notification.push({
        type:'status-updated',
        message:`your appoinment has been updated${status}`,
        onClickPath:'/doctor-appoinments'
      })
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appoinment status updated",
      });
      
    } catch (error) {
      consol.log(error)
      res.status(500).send
    ({
      success:false,
      error,
      message:'Error in update status'
    })  
    }
    };

module.exports = { getDoctorInfoController , updateProfileController, getDoctorByIdController,  doctorAppoinmentController, updateStatusController };