import express from 'express'
import { DBconnection } from './Database/Connection.js'
import { bootstrap } from './Src/Modules/index.routes.js'
import dotenv from 'dotenv'
import { AppError } from './Src/utilites/AppError.js';
import { GlobalErrorHandling } from './Src/middleware/globalErrorHandlling.js';
import cors from 'cors'
dotenv.config()
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

bootstrap(app)
DBconnection()

app.use('*', (req, res, next) => {
    next(new AppError(`not found ${req.originalUrl}`, 404))
})
app.use(GlobalErrorHandling)
process.on('unhandledRejection', (err) => {
    console.log('error', err);
})
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))