const { ObjectID } = require('bson')
const mongoose = require('mongoose')

const doctorScheduleSchema = new mongoose.Schema({
    // doctor_id: {
    //     type: ObjectID,
    //     required: true
    // },
    name: {
        type: String,
        required: true,
        trim: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    date: {
        type: Date,
        required: true
    },
    day: {
        type: String
        // required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    average_time: {
        type: Number,
        required: true
    },
    schedule_status: {
        type: Boolean,
        required: true,
        default: true
    }
})
doctorScheduleSchema.virtual('appointments',{
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'doctor_schedule'
})

const DoctorSchedule = mongoose.model('DoctorSchedule', doctorScheduleSchema)

module.exports = DoctorSchedule