const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const patientSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
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
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true,
        length: 10,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    maritial_status: {
        type: String,
        required: true
    },
    added_on: {
        type: Date
    },
    email_verify: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

patientSchema.virtual('appointments',{
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'patient'
})

patientSchema.methods.toJSON = function() {
    const patient = this
    const patientObject = patient.toObject()

    delete patientObject.password
    delete patientObject.tokens

    return patientObject
}

patientSchema.methods.generateAuthToken = async function () {
    const patient = this
    const token = jwt.sign({ _id: patient._id.toString()}, process.env.PATIENT_JWT_SECRET)

    patient.tokens = patient.tokens.concat({ token })
    await patient.save()

    return token
}

patientSchema.statics.findByCredentials = async (email, password) => {
    const patient = await Patient.findOne({email})
    if(!patient){
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, patient.password)
    if(!isMatch){
        throw new Error('Unable to login!')
    }

    return patient
}

patientSchema.pre('save', async function (next) {
    const patient = this
    if(patient.isModified('password')){
        patient.password = await bcrypt.hash(patient.password, 8)
    }
    next()
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient