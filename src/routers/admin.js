const express = require('express')
const Admin = require('../models/admin')
const Doctor = require('../models/doctor')
const Patient = require ('../models/patient')
const DoctorSchedule = require('../models/doctor-schedule')
const Appointment = require('../models/appointment')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body)

    try {
        await admin.save()
        res.status(201).send(admin)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()

        res.cookie('adminjwt', token, {
            httpOnly: true
        })
        // res.send({ admin: await admin.getPublicProfile(), token})
        res.send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.clearCookie('adminjwt')
        res.send('Logout...')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/admin/logoutAll', auth, async (req, res) => {
    try {
        // req.admin.tokens = []
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token === req.token
        })

        await req.admin.save()
        res.send('All Logout...')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/admin/Profile', auth, async (req, res) => {

    res.send(req.admin)

})

router.patch('/admin/Profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    // const allowedUpdates = Object.keys(req.admin)
    const allowedUpdates = ["name", "email", "password", "hospital_name", "hospital_address", "hospital_contact_no"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const admin = await Admin.findById(req.admin._id)
        if(req.body.password===''){
            let temp=updates.filter((update)=>{
                return update!=='password'
            })
            updates=temp
        }
        updates.forEach((update) => {
            admin[update] = req.body[update]
        })
        await admin.save()

        if (!admin) {
            return res.status(404).send()
        }
        res.send(admin)
    } catch (e) {
        res.status(400).send(e)
    }
})

// -------------------------- doctor create ------------------------
router.post('/admin/createdoctor', auth, async (req, res) => {
    const doctor = new Doctor(req.body)

    try {
        await doctor.save()
        res.status(201).send(doctor)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/admin/doctor', auth, async (req, res) => {
    // res.send(req.admin)

    try {
        const doctors = await Doctor.find({})
        res.send(doctors)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/doctor/:id', auth,  async (req, res) => {
    const _id = req.params.id

    try {
        const doctor = await Doctor.findById(_id)

        if (!doctor) {
            return res.status(404).send()
        }

        res.send(doctor)
    } catch (e) {
        res.status(500).send()
    }

})

router.patch('/admin/doctor/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    // const allowedUpdates = Object.keys(req.admin)
    const allowedUpdates = ["name", "email", "password", "phone_no", "address", "dob", "degree", "speciality", "status", "added_on"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const doctor = await Doctor.findById(req.params.id)
        if(req.body.password===''){
            let temp=updates.filter((update)=>{
                return update!=='password'
            })
            updates=temp
        }
        updates.forEach((update) => {
            doctor[update] = req.body[update]
        })
        await doctor.save()

        if (!doctor) {
            return res.status(404).send()
        }
        res.send(doctor)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/admin/doctor/:id', auth, async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id)

        if (!doctor) {
            return res.status(404).send()
        }

        res.status(200).send(doctor)
    } catch (e) {
        res.status(500).send(e)
    }
})

// ---------------------------------------- doctor Schedule ------------------------------------------

router.get('/admin/schedules', auth, async (req,res) => {

    try{
        const schedule = await DoctorSchedule.find({})
        res.send(schedule)
    }catch (e) {
        res.send(500).send(e);
    }
})

router.get('/admin/schedules/:id', auth, async (req,res) => {

    try{
        const schedule = await DoctorSchedule.findById(req.params.id)
        res.send(schedule)
    }catch (e) {
        res.send(500).send(e);
    }
})

router.delete('/admin/schedules/:id', auth, async (req, res) => {
    try {
        const schedules = await DoctorSchedule.findByIdAndDelete(req.params.id)

        if (!schedules) {
            return res.status(404).send()
        }

        res.status(200).send(schedules)
    } catch (e) {
        res.status(500).send(e)
    }
})

// ---------------------------------------- patient ---------------------------------------------------

router.get('/admin/patients', auth, async (req,res) => {

    try{
        const patient = await Patient.find({})
        res.send(patient)
    }catch (e) {
        res.send(500).send(e);
    }
})

router.get('/admin/patients/:id', auth, async (req,res) => {

    try{
        const patient = await Patient.findById(req.params.id)
        res.send(patient)
    }catch (e) {
        res.send(500).send(e);
    }
})

// ---------------------------------------- patient Appointment --------------------------------------------
const getDoctor = async (id) =>{
    const doctor = await Doctor.findById(id)

    if (!doctor) {
        return 'not found'
    }

    return doctor
}
const getPatient = async (id) => {
    return await Patient.findById(id)
}
const getSchedule = async (id) => {
    return await DoctorSchedule.findById(id)
}

router.get('/admin/appointments', auth, async (req,res) => {
    try{
        const appointment = await Appointment.find({})
        // console.log(appointment)
        // const appointments = appointment.map((appointmentObj)=>{
        //     appointmentObj.populate('doctor')
        //     appointmentObj.populate('patient')
        //     appointmentObj.populate('doctor_schedule')
        //     return appointmentObj
        // })
        // const appointments = appointment.map((appointmentObj)=>{
            // const doctor = await Doctor.findById(appointmentObj.doctor)
            // const schedule =  DoctorSchedule.findById(appointmentObj.doctor_schedule)
            // const patient =  Patient.findById(appointmentObj.patient)
            // return {appointment:appointmentObj, doctor, schedule, patient}
        // })
        res.send(appointment)
    }catch (e) {
        res.send(500).send(e);
    }
})

router.get('/admin/appointment/:id', auth, async (req,res) => {
    try{
        const appointment = await Appointment.findById(req.params.id)
        if(!appointment){
            return res.status(404).send()
        }
        await appointment.populate('doctor')
        await appointment.populate('patient')
        await appointment.populate('doctor_schedule')
       res.send(appointment)
    }catch (e) {
        res.send(500).send(e);
    }
})

router.patch('/admin/appointment/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['status','patient_come_into_hospital']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const appointment = await Appointment.findOne({_id: req.params.id})
        if(!appointment){
            return res.status(404).send()
        }
        updates.forEach((update) => {
            appointment[update] = req.body[update]
        })
        await appointment.save()
        res.send(appointment)
    }catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router