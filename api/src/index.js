import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import passport from 'passport'

import initializePassport from './configs/passport.js'
import router from './routes/index.js'

const port = process.env.PORT || 3006

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
initializePassport(passport)

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB connected')
});


router(app)
app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    })
})
app.listen(port, function () { console.log('listening on port ' + port) })