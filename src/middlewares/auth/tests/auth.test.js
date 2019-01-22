const app = require('../../../app')
const request = require('supertest')(app)
import userModel from '../../../models/userModel'
const connection = require('../../../config/database/testDB')
import redisClient from '../../../config/server'
const {sanitizeTestObject} = require('../../../config/tests/sanitizeTestObject')

const dropUserCollection = async () => userModel.remove()


let user = {
  '_id': 'TESTOBJECT01',
  'name': 'Jhon',
  'userName': 'jhon',
  'password': '123456'
}

const createUser = async () => userModel.create(user)

beforeEach(() => {
  createUser()
})

afterEach(()=> {
  dropUserCollection()
})

beforeAll(() => {
  dropUserCollection()
})

afterAll(() => {
  dropUserCollection()
  connection.disconect()
})

describe('Auth tests', ()=>{

  test('It should authenticate the user when it is passed the correct userName and password',async () => {

    const res = await request.post('/api/auth/login').send({'userName': user.userName, 'password': user.password})
    expect(sanitizeTestObject(res.body, ['token'])).toMatchSnapshot()
  })

  test('It should not authenticate the user when it is passed the wrong userName ',async () => {

    const res = await request.post('/api/auth/login').send({'userName': 'Jõao', 'password': user.password})
    expect(sanitizeTestObject(res.body, ['token'])).toMatchSnapshot()
  })

  test('It should not authenticate the user when it is passed the wrong password',async () => {

    const res = await request.post('/api/auth/login').send({'userName': user.userName, 'password': '1'})
    expect(sanitizeTestObject(res.body, ['token'])).toMatchSnapshot()
  })

})