const express = require('express')
const Patient = require('../models/patient')
const Appointment = require('../models/appointment')
const DoctorSchedule = require('../models/doctor-schedule')
const patientAuth = require('../middleware/patient-auth')
const router = new express.Router()

router.post('/patient/signup', async (req, res) => {
    const patient = new Patient(req.body)
    // console.log(patient)
    try {
        await patient.save()
        res.status(201).send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/patient/login', async (req, res) => {
    try {
        const patient = await Patient.findByCredentials(req.body.email, req.body.password)
        const token = await patient.generateAuthToken()

        res.cookie('patientjwt', token, {
            httpOnly: true
        })
        res.send({ patient, token })
        // res.send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/patient/logout', patientAuth, async (req, res) => {
    try {
        req.patient.tokens = req.patient.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.patient.save()
        res.clearCookie('patientjwt')
        res.send('Logout...')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/patient/logoutAll', patientAuth, async (req, res) => {
    try {
        // req.patient.tokens = []
        req.patient.tokens = req.patient.tokens.filter((token) => {
            return token.token === req.token
        })

        await req.patient.save()
        res.send('All Logout...')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/patient/Profile', patientAuth, async (req, res) => {

    res.send(req.patient)

})

router.patch('/patient/Profile', patientAuth, async (req, res) => {
    let updates = Object.keys(req.body)
    // const allowedUpdates = Object.keys(req.admin)
    const allowedUpdates = ["email","first_name", "last_name", "password", "dob", "gender", "phone_no", "address", "maritial_status"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const patient = await Patient.findById(req.patient._id)
        if(req.body.password===''){
            let temp=updates.filter((update)=>{
                return update!=='password'
            })
            updates=temp
        }
        updates.forEach((update) => {
            patient[update] = req.body[update]
        })
        console.log(patient)
        await patient.save()

        if (!patient) {
            return res.status(404).send()
        }
        res.send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
})

// ---------------------------------- appointment router ----------------------------------------

router.post('/patient/appointments', patientAuth, async (req,res) => {
    // const appointment = new Appointment(req.body)
    const appointment = new Appointment({
        ...req.body,
        patient: req.patient._id
    })
    try{
        await appointment.save()
        res.status(201).send(appointment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/patient/book-appoinments',patientAuth, async (req,res) => {
    try{
        let schedules = await DoctorSchedule.find({})
        res.send({schedules,patient:req.patient})
        // console.log(schedules)
    }catch(e){
        res.send(500).send(e);
    }
})
router.get('/patient/book-appoinments/:id',patientAuth, async (req,res) => {
    try{
        let schedule = await DoctorSchedule.findById(req.params.id)
        await schedule.populate('doctor')
        res.send(schedule)
    }catch(e){
        res.send(500).send(e);
    }
})

router.get('/patient/appointments', patientAuth, async (req,res) => {
    try{
       await req.patient.populate('appointments')
       res.send(req.patient.appointments)
    }catch (e) {
        res.send(500).send(e);
    }
})

router.get('/patient/appointments/:id', patientAuth, async (req,res) => {
    try{
        const appointment = await Appointment.findOne({_id: req.params.id, patient:req.patient._id})
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

router.patch('/patient/appointments/:id', patientAuth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['reason','time','status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const appointment = await Appointment.findOne({_id: req.params.id, patient: req.patient._id})
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

router.delete('/patient/appointments/:id', patientAuth, async (req,res) => {
    try {
        const appointment = await Appointment.findOneAndDelete({_id: req.params.id, patient: req.patient._id})
        if(!appointment){
            res.status(404).send()
        }
        res.send(appointment)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router