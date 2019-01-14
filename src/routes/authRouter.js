import express from 'express'

const router = express.Router()

import {authenticate} from '../controllers/authController'

router.post('/auth/login', authenticate )

module.exports = app => app.use('/api', router) 