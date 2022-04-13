const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password string should not contain "password"')
            }
        }
    },
    phone_no: {
        type: Number,
        required: true,
        length: 10,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    dob: {
        type: Date,
    },
    degree: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    added_on: {
        type: Date
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

doctorSchema.virtual('schedule',{
    ref: 'DoctorSchedule',
    localField: '_id',
    foreignField: 'doctor'
})
doctorSchema.virtual('appointments',{
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'doctor'
})

doctorSchema.methods.toJSON = function() {
    const doctor = this
    const doctorObject = doctor.toObject()

    delete doctorObject.password
    delete doctorObject.tokens

    return doctorObject
}

doctorSchema.methods.generateAuthToken = async function () {
    const doctor = this
    const token = jwt.sign({ _id: doctor._id.toString()}, process.env.DOCTOR_JWT_SECRET)

    doctor.tokens = doctor.tokens.concat({ token })
    await doctor.save()

    return token
}

doctorSchema.statics.findByCredentials = async (email, password) => {
    const doctor = await Doctor.findOne({email})
    if(!doctor){
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, doctor.password)
    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return doctor
}

doctorSchema.pre('save', async function (next) {
    const doctor = this
    if(doctor.isModified('password')){
        doctor.password = await bcrypt.hash(doctor.password, 8)
    }
    next()
})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor