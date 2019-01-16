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

require('./routes')(app)
require('./middlewares/auth/authRouter')(app)

export default app