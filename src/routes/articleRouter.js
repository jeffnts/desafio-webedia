import express from 'express'
const router = express.Router()

import {create, list, show, update, remove} from '../controllers/articleController'


router
    .post('/articles', create)
    .get('/articles', list)
    .get('/articles/:permalink', show)
    .put('/articles/:permalink', update)
    .delete('/articles/:permalink', remove)
       

module.exports = app => app.use('/api', router)