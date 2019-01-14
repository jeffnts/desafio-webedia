import {
        initServer,
        databaseConnection
} from './config/server'

import express from 'express'
import bodyParser from 'body-parser'

const app = express()



if(!module.parent) initServer(app, 4000) 

databaseConnection()

//Body Parser config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//Routes definitions
//import userRouter from './routes/userRouter'
//app.use('/api', userRouter)
require('./routes/userRouter')(app)
require('./routes/authRouter')(app)
export default app