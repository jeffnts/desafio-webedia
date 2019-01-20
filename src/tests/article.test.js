//import app from '../app'
const app = require('../app')
const request = require('supertest')(app)
const connection = require('../config/database/testDB')
const {sanitizeTestObject} = require('../config/tests/sanitizeTestObject')

import authorModel from '../models/authorModel'
import articleModel from '../models/articleModel'

const dropArticleCollection = async () => articleModel.remove()
const dropAuthorCollection = async () => authorModel.remove()
const createAuthor = async () => await request.post('/api/authors').send(author)
beforeAll(() => {
  dropArticleCollection()
  dropAuthorCollection()
  createAuthor()
})

afterAll(() => {
connection.disconect()
})

let author = {
  "_id": "TESTOBJECT01",
  "name": "Monteiro Lobato"
}

let article = {
  "_id": "TESTOBJECT02",
  "title": "Artigo 1",
  "permalink": "artigo-1",
  "authors":["TESTOBJECT01"]
}

describe('Article tests', () =>{
  describe('POST method', () =>{
    test('It should create a new article.', async () =>{
      const res = await request.post('/api/articles').send(article);
      expect(sanitizeTestObject(res.body)).toMatchSnapshot();
      expect(res.statusCode).toBe(201);
    })

    test('It should not create a article with a inexistent author.', async () =>{
      article.authors[0] = "TEST"
      const res = await request.post('/api/articles').send(article);
      expect(sanitizeTestObject(res.body)).toMatchSnapshot();
      expect(res.statusCode).toBe(404);
    })

    test('It should not create a author without a  author.', async () =>{
      article.authors[0] = undefined
      const res = await request.post('/api/articles').send(article);
      expect(sanitizeTestObject(res.body)).toMatchSnapshot();
      expect(res.statusCode).toBe(406);
    })

  })

})