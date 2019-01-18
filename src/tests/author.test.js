import app from '../app'
const request = require('supertest')(app.callback())
import authorModel from '../models/authorModel'
const connection = require('../config/database/test')
const {sanitizeTestObject} = require('../config/tests/sanitizeTestObject')

const dropCollection = async () => authorModel.remove()



beforeAll(() => {
    dropCollection()    
})
    
afterAll(() => {
connection.disconect()
})

describe('Author tests', () =>{

})