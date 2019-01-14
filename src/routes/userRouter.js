import express from 'express'
const router = express.Router()

import {create} from '../controllers/userController'

router.post('/user', create)

module.exports = app => app.use('/api', router)