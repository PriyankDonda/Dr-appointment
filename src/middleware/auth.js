const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const auth = async (req, res, next) => {

    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(req.cookies)
        const token = req.cookies.adminjwt
        // console.log(token)
        const decode = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
        const admin = await Admin.findOne({ _id: decode._id, 'tokens.token': token })

        if(!admin){
            console.log('error while auth')
            throw new Error()
        }

        req.token = token
        req.admin = admin
        next()
    }catch (e) {
        res.status(401).send({ error: 'Please Authenicate'})
    }
}

module.exports = auth
