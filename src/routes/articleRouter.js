import express from 'express'
const router = express.Router()

import {create, list, show, update, remove} from '../controllers/articleController'


router
    .post('/article', create)
    .get('/article', list)
    .get('/article/:permalink', show)
    .put('/article/:permalink', update)
    .delete('/article/:permalink', remove)
       

module.exports = app => app.use('/api', router)