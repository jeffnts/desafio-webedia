import authorModel from '../models/authorModel'
import articleModel from '../models/articleModel'

import {redisClient} from '../config/server'

module.exports = {
  create: async (req, res) =>{
    try {
      await authorModel.create(req.body)

      //Deleting cache
      redisClient.keys("cacheAuthors*", function(err, rows) {
        rows.forEach(key =>{
          redisClient.del(key)
        })
      })



      return res.status(201).json({
        message: 'Autor criado com sucesso!'
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Erro no servidor ao tentar cadastrar o autor.',
        error
      })
    }
  },
  list: async (req, res) =>{

    try {
      const {offset, limit} = req.query

      redisClient.get(`cacheAuthors${offset}${limit}`, async (err, result) => {
        if (result) {
          const resultJSON = JSON.parse(result)
          return res.status(200).json({authors: resultJSON})
        } else {
          const authors = await authorModel.paginate({}, {offset: parseInt(offset), limit: parseInt(limit)})

          redisClient.set(`cacheAuthors${offset}${limit}`, JSON.stringify(authors))
          redisClient.expire(`cacheAuthors${offset}${limit}`, 50)

          return res.status(200).json({authors})
        }
      })

    } catch (error) {
      return res.status(500).json({
        message: 'Erro no servidor ao tentar listar o autor.',
        error: error.message
      })
    }

  },
  show: async (req, res) =>{
    try {
      const{id} = req.params

      redisClient.get(`caheAuthor${id}`, async (err, result) => {
        if(result){
          const resultJSON = JSON.parse(result)
          return res.status(200).json({author: resultJSON})
        }
        else{
          const author = await authorModel.findById(id)

          if(author === null){
            return res.status(404).json({
              message: 'Este autor não existe.'
            })
          }

          redisClient.set(`caheAuthor${id}`, JSON.stringify(author))
          redisClient.expire(`caheAuthor${id}`, 50)

          return res.status(200).json({author})
        }
      })




    } catch (error) {
      return res.status(500).json({
        message: 'Erro no servidor ao tentar listar os autores.',
        error: error.message
      })
    }
  },
  update: async (req, res) =>{
    try {
      const{id} = req.params

      const author = await authorModel.findByIdAndUpdate(id, req.body)

      if(author === null){
        res.status(404).json({
          message: 'Este autor não existe.'
        })
      }

      redisClient.set(`cacheAuthor${id}`, JSON.stringify(author))

      return res.status(200).json({
        message: 'Autor atualizado com sucesso!'
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Erro no servidor ao tentar atualizar o autor.',
        error: error.message
      })
    }
  },
  remove: async (req, res) =>{
    try {
      const{id} = req.params

      const author = await authorModel.findById(id)

      if(author === null){
        res.status(404).json({
          message: 'Este autor não existe.'
        })
      }

      const articles = await articleModel.find().where({authors: id})

      author.remove()

      redisClient.del(`caheAuthor${id}`)
      redisClient.keys("cacheAuthors*", function(err, rows) {
        rows.forEach(key =>{
          redisClient.del(key)
        })
      })

      //Removing the author reference from the article
      articles.forEach(article =>{
        article.authors.remove(author)
      })

      return res.status(200).json({
        message: 'Autor removido com sucesso!'
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Erro no servidor ao tentar remover o autor.',
        error: error.message
      })
    }
  },
}