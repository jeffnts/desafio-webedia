import {
        initServer,
        databaseConnection,
        redisConnection,
        initSwagger
} from './config/server'

import express from 'express'
import bodyParser from 'body-parser'

const app = express()


databaseConnection()

redisConnection()

if(!module.parent) initServer(app, 4000) 



//Body Parser config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


require('./routes')(app)
require('./middlewares/auth/authRouter')(app)

initSwagger(app)

module.exports = app