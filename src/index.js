const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const patientRouter = require('./routers/patient')
const doctorRouter = require('./routers/doctor')
const cookieparser = require("cookie-parser")
const path = require('path')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieparser())
app.use(adminRouter)
app.use(patientRouter)
app.use(doctorRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../client/build')))
    app.get('*', (req,res)=>{
        // res.sendFile('index.html', { root: path.join(__dirname, '../client/build') });
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
    })
}

app.listen(port, () => {
    // console.log('path : ',__dirname)
    console.log('server is up on port ' + port)
})
