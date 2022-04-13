const jwt = require('jsonwebtoken')
const Patient = require('../models/patient')

const patientAuth = async (req, res, next) => {

    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)
        const token = req.cookies.patientjwt
        const decode = jwt.verify(token, process.env.PATIENT_JWT_SECRET)
        const patient = await Patient.findOne({ _id: decode._id, 'tokens.token': token })

        if(!patient){
            throw new Error()
        }

        req.token = token
        req.patient = patient
        next()
    }catch (e) {
        res.status(401).send({ error: 'Please Authenicate'})
    }
}

module.exports = patientAuth
