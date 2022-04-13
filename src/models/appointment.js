const { ObjectID } = require('bson')
const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    doctor_schedule: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'DoctorSchedule'
    },
    appointment_number: {
        type: Number
        // unique: true
    },
    reason: {
        type: String,
        required: true
    },
    // date: {
    //     type: Date,
    //     required: true
    // },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Booked'
    },
    patient_come_into_hospital: {
        type: Boolean,
        required: true,
        default: false
    },
    doctor_comment: {
        type: String,
        default: ''
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment