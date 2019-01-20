const app = require('../app')
const request = require('supertest')(app)
import authorModel from '../models/authorModel'
const connection = require('../config/database/testDB')
const {sanitizeTestObject} = require('../config/tests/sanitizeTestObject')

const dropCollection = async () => authorModel.remove()

beforeAll(() => {
    dropCollection()    
})
    
afterAll(() => {
connection.disconect()
})

let author = {
  "_id": "TESTOBJECT01",
  "name": "Monteiro Lobato"
}


describe('Author tests', () =>{
  describe('POST method', () =>{
    test('It should create a new author.', async () =>{
      const res = await request.post('/api/authors').send(author)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(201)
    })
  })

  describe('GET method', () =>{
    test('It shoul return all authors', async () =>{
      const res = await request.get('/api/authors')
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })

    test('It should return the authors according the id passed as parameter', async () =>{
      const res = await request.get(`/api/authors/${author._id}`)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })
    test('It should not return the authors with the wrong the id passed as parameter', async () =>{
      const res = await request.get('/api/authors/TESTOBJECT02')
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(404)
    })
  })

  describe('PUT method', ()=>{
    test('It should update the author according the id passed as parameter', async () =>{
      const res = await request.put(`/api/authors/${author._id}`).send({name: 'Zé do Livro'})
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })
    test('It should not update the author with the wrong id passed as parameter', async () =>{
      const res = await request.put('/api/authors/TESTOBJECT02').send({name: 'Zé do Livro'})
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(404)
    })
  })

  describe('DELETE method', ()=>{
    test('It should not delete the author with the wrong id passed as parameter', async () =>{
      const res = await request.delete('/api/authors/TESTOBJECT02')
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(404)
    })
    test('It should delete the author according the id passed as parameter', async () =>{
      const res = await request.delete(`/api/authors/${author._id}`)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })

  })
})