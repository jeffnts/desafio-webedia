import {
        initServer,
        databaseConnection
} from './config/server'

import express from 'express'

const app = express()


if(!module.parent) initServer(app, 4000) 

databaseConnection()
