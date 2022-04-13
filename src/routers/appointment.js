const express = require('express')
const Appointment = require('../models/appointment')
const Patient = require('../models/patient')
const router = new express.Router()

// router.post('/patient/appointment', async(req,res) => {
//     try{
//         const appointment = new Appointment(req.body)
//         await appointment.save()
//         res.status(201).send(appointment)
//     }catch (e) {
//         res.status(400).send(e);
//     }
// })
