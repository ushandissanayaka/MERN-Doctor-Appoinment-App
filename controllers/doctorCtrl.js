const doctorModel = require('../models/DoctorModel')
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

module.exports = { getDoctorInfoController };