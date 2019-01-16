import express from 'express'
const router = express.Router()

import {create, list, update, remove} from '../controllers/commentsController'
import {isAuthenticated} from '../middlewares/auth/authController'


router
    .post('/comments/:permalink', isAuthenticated, create)
    .get('/comments/:permalink', isAuthenticated, list)
    .put('/comments/:commentId/:permalink', isAuthenticated, update)
    .delete('/comments/:commentId/:permalink', isAuthenticated, remove)       

module.exports = app => app.use('/api', router)