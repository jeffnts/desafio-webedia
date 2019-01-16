import app from '../app'
const request = require('supertest')(app.callback())
import articleModel from '../models/articleModel'
const connection = require('../config/database/test')
import {sanitizeTestObject} from '../config/tests/sanitizeTestObject'

const dropCollection = async () => articleModel.remove()



beforeAll(() => {
    dropCollection()    
})
    
afterAll(() => {
connection.disconect()
})

describe('Article tests', () =>{

})