import express from 'express'
const router = express.Router()

import {create, list, show, update, remove} from '../controllers/authorController'

router
    .post('/author', create)
    .get('/author', list)
    .get('/author/:id', show)
    .put('/author/:id', update)
    .delete('/author/:id', remove)
 

module.exports = app => app.use('/api', router)

