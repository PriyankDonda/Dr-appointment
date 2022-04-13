const jwt = require('jsonwebtoken')
const Doctor = require('../models/doctor')

const doctorAuth = async (req, res, next) => {

    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.doctorjwt
        const decode = jwt.verify(token, process.env.DOCTOR_JWT_SECRET)
        const doctor = await Doctor.findOne({ _id: decode._id, 'tokens.token': token })

        if(!doctor){
            throw new Error()
        }

        req.token = token
        req.doctor = doctor
        next()
    }catch (e) {
        res.status(401).send({ error: 'Please Authenicate'})
    }
}

module.exports = doctorAuth
