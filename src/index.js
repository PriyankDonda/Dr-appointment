const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const patientRouter = require('./routers/patient')
const doctorRouter = require('./routers/doctor')
const cookieparser = require("cookie-parser")
const path = require('path')


const app = express()
const port = process.env.PORT || 5000

// app.use(express.static(path.join(__dirname + "/src")))

app.use(express.json())
app.use(cookieparser())
app.use(adminRouter)
app.use(patientRouter)
app.use(doctorRouter)

if(process.env.NODE_ENV === 'production'){
    console.log('path : ',__dirname)
    app.use(express.static('../client/build'))
    app.get('*',(req,res)=>{
        req.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(process.env.MONGODB_URL);
    console.log('server is up on port ' + port)
})
