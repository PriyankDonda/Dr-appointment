const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const patientRouter = require('./routers/patient')
const doctorRouter = require('./routers/doctor')
const cookieparser = require("cookie-parser")


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieparser())
app.use(adminRouter)
app.use(patientRouter)
app.use(doctorRouter)


app.listen(port, () => {
    console.log('server is up on port ' + port)
})
