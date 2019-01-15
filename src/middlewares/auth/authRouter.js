import express from 'express'

const router = express.Router()

import {authenticate} from './authController'

router.post('/auth/login', authenticate )

module.exports = app => app.use('/api', router) 