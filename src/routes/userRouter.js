import express from 'express'
const router = express.Router()

import {create, show, update, remove} from '../controllers/userController'
import{isAuthenticated} from '../middlewares/auth/authController'
/**
 * @swagger
 * /user:
 *    get:
 *      description: This should return all users
 */
router
    .post('/user', create)
    .get('/user',isAuthenticated, show)
    .put('/user',isAuthenticated, update)
    .delete('/user', isAuthenticated, remove)    

module.exports = app => app.use('/api', router)