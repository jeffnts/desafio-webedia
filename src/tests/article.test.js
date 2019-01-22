//import app from '../app'
const app = require('../app')
const request = require('supertest')(app)
const connection = require('../config/database/testDB')
const {sanitizeTestObject} = require('../config/tests/sanitizeTestObject')

import authorModel from '../models/authorModel'
import articleModel from '../models/articleModel'

const dropArticleCollection = async () => articleModel.remove()
const dropAuthorCollection = async () => authorModel.remove()

beforeAll(async() => {
  dropArticleCollection()
  dropAuthorCollection()
  await request.post('/api/authors').send(authorObject)
})

afterAll(() => {
  dropArticleCollection()
  dropAuthorCollection()
  connection.disconect()
})

let authorObject = {
  "_id": "TESTOBJECT01",
  "name": "Monteiro Lobato"
}

let article = {
  "_id": "TESTOBJECT02",
  "title": "Artigo 1",
  "permalink": "artigo-1",
  "authors":["TESTOBJECT01"]
}
let article2 = {
  "_id": "TESTOBJECT03",
  "title": "Artigo 1",
  "permalink": "artigo-1",
  "authors":["TESTOBJECT11"]
}
let article3 = {
  "_id": "TESTOBJECT03",
  "title": "Artigo 1",
  "permalink": "artigo-1"
}

describe('Article tests', () =>{
  describe('POST method', () =>{
    test('It should create a new article.', async () =>{
      const res = await request.post('/api/articles').send(article)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(201)
    })

    test('It should not create a article with a inexistent author.', async () =>{
      const res = await request.post('/api/articles').send(article2)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(404)
    })

    test('It should not create a article without a  author.', async () =>{
      const res = await request.post('/api/articles').send(article3)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(406)
    })

  })

  describe('GET method', () =>{
    test('It shoul return all articles', async () =>{
      const res = await request.get('/api/articles')
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })

    test('It should return the articles according the permalink passed as parameter', async () =>{
      const res = await request.get(`/api/articles/${article.permalink}`)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })
    test('It should not return the articles with the wrong permalink passed as parameter', async () =>{
      const res = await request.get(`/api/articles/meu-artigo`)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(404)
    })
  })

  describe('PUT method', ()=>{
    test('It should not update the article with the wrong permalink passed as parameter', async () =>{
      const res = await request.put(`/api/articles/meu-artigo`).send({title: 'Artigo de Zé do Livro'})
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(404)
    })
    test('It should update the article according the permalink passed as parameter', async () =>{
      const res = await request.put(`/api/articles/${article.permalink}`).send({title: 'Artigo de Zé do Livro'})
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })
  })

  describe('DELETE method', ()=>{
    test('It should not delete the article with the wrong permalink passed as parameter', async () =>{
      const res = await request.delete('/api/articles/meu-artigo')
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(404)
    })
    test('It should delete the article according the permalink passed as parameter', async () =>{
      const res = await request.delete(`/api/articles/${article.permalink}`)
      expect(sanitizeTestObject(res.body)).toMatchSnapshot()
      expect(res.statusCode).toBe(200)
    })

  })
})