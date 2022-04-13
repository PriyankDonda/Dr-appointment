const express = require('express')
const Doctor = require('../models/doctor')
const DoctorSchedule = require('../models/doctor-schedule')
const Appointment = require('../models/appointment')
const doctorAuth = require('../middleware/doctor-auth')
const { route } = require('express/lib/application')
const router = new express.Router()

// router.post('/doctor', async (req, res) => {
//     const doctor = new Doctor(req.body)

//     try {
//         await doctor.save()
//         res.status(201).send(doctor)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.post('/doctor/login', async (req, res) => {
    try {
        const doctor = await Doctor.findByCredentials(req.body.email, req.body.password)
        const token = await doctor.generateAuthToken()

        res.cookie('doctorjwt', token, {
            httpOnly: true
        })
        res.send({ doctor, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/doctor/logout', doctorAuth, async (req, res) => {
    try {
        req.doctor.tokens = req.doctor.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.doctor.save()
        res.clearCookie('doctorjwt')
        res.send('Logout...')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/doctor/logoutAll', doctorAuth, async (req, res) => {
    try {
        req.doctor.tokens = req.doctor.tokens.filter((token) => {
            return token.token === req.token
        })

        await req.doctor.save()
        res.send('All Logout...')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/doctor/Profile', doctorAuth, async (req, res) => {

    res.send(req.doctor)

})

router.patch('/doctor/Profile', doctorAuth, async (req, res) => {
    let updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "dob", "degree", "phone_no", "address", "speciality", "status", "added_on"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const doctor = await Doctor.findById(req.doctor._id)
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

// ------------------------------------- schedule -----------------------------------------------------
const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
router.post('/doctor/schedule', doctorAuth, async (req, res) => {
    // const schedule = new DoctorSchedule(req.body)
    const schedule = new DoctorSchedule({
        ...req.body,
        doctor: req.doctor._id,
        name: req.doctor.name,
        day: day[new Date(req.body.date).getUTCDay()]
    })

    try{
        await schedule.save()
        console.log(schedule)
        res.status(201).send(schedule)
    }catch (e) {
        res.status(400).send(e);
    }
})

router.get('/doctor/schedule', doctorAuth, async (req,res) => {

    try{
       await req.doctor.populate('schedule')
       res.status(200).send(req.doctor.schedule)
    }catch (e) {
        res.send(500).send(e);
    }
})

router.patch('/doctor/schedule/:id', doctorAuth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['date','start_time','end_time','average_time','schedule_status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const schedule = await DoctorSchedule.findOne({_id: req.params.id, doctor: req.doctor._id})
        if(!schedule){
            return res.status(404).send()
        }
        updates.forEach((update) => {
            schedule[update] = req.body[update]
        })
        await schedule.save()
        res.send(schedule)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/doctor/schedule/:id', doctorAuth, async (req,res) => {
    try {
        const schedule = await DoctorSchedule.findOneAndDelete({_id: req.params.id, doctor: req.doctor._id})
        if(!schedule){
            res.status(404).send()
        }
        res.send(schedule)
    } catch (e) {
        res.status(500).send()
    }
})

//------------------------------------------------------------ appointments
router.get('/doctor/appointments', doctorAuth, async (req,res) => {
    try{
        await req.doctor.populate('appointments')
        res.send(req.doctor.appointments)
     }catch (e) {
         res.send(500).send(e);
     }
})

router.get('/doctor/appointments/:id', doctorAuth, async (req,res) => {
    try{
        const appointment = await Appointment.findOne({_id: req.params.id, doctor:req.doctor._id})
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

router.patch('/doctor/appointments/:id', doctorAuth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['doctor_comment','status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const appointment = await Appointment.findOne({_id: req.params.id, doctor: req.doctor._id})
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