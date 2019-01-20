import express from 'express'
const router = express.Router()

import {create, list, show, update, remove} from '../controllers/authorController'

router
    .post('/authors', create)
    .get('/authors', list)
    .get('/authors/:id', show)
    .put('/authors/:id', update)
    .delete('/authors/:id', remove)
 

module.exports = app => app.use('/api', router)

