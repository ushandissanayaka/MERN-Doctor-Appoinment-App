const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
    },
    experience: {
        type: String,
        required: [true, 'Experience is required'],
    },
    feesPerConsultation: { // Corrected this line
        type: Number,
        required: [true, 'Fee is required'],
    },
    status: {
        type: String,
        default: 'pending',
    },
    timings: { // Corrected this line
        type: [String], // Adjust based on your requirement
        required: [true, 'Work timings are required'],
    },
}, { timestamps: true });

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;
