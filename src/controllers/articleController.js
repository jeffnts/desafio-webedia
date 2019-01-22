import articleModel from '../models/articleModel'
import authorModel from '../models/authorModel'
import commentsModel from '../models/commentsModel'

import {redisClient} from '../config/server'

module.exports = {
    create: async (req, res) =>{
        try {
            const {authors} = req.body

            if(!authors){
                return res.status(406).json({
                    message: 'É obrigatório um artigo ter autor!'
                })
            }

            const author = await authorModel.findById(authors)

            if(!author){
                return res.status(404).json({
                    message: 'Este autor não existe.'
                })
            }

            await articleModel.create(req.body)

            //Deleting cache
            redisClient.keys("cacheArticles*", function(err, rows) {
                rows.forEach(key =>{
                redisClient.del(key)
                })
            })

            return res.status(201).json({
                message: 'Artigo criado com sucesso!'
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar cadastrar o artigo.',
                error: error.message
              })
        }
    },
    list: async (req, res) =>{
        try {
            const {offset, limit} = req.query

            redisClient.get(`cacheArticles${offset}${limit}`, async (err, result) =>{
                if(result){
                  const resultJSON = JSON.parse(result)

                  //Omitting the User Id
                  resultJSON.docs.forEach(elements =>{
                    for(let i = 0; i < elements.comments.length; i++){
                      elements.comments[i].user = undefined
                    }
                  })

                  return res.status(200).json({articles: resultJSON})
                }else{
                    const articles = await articleModel.paginate({}, {offset: parseInt(offset), limit: parseInt(limit), populate: ['authors', 'comments']})

                    redisClient.set(`cacheArticles${offset}${limit}`, JSON.stringify(articles))
                    redisClient.expire(`cacheArticles${offset}${limit}`, 50)

                    if(articles.docs.comments){
                      //Omitting the User Id
                      articles.docs.forEach(elements =>{
                        for(let i = 0; i < elements.comments.length; i++){
                          elements.comments[i].user = undefined
                        }
                      })
                    }

                    return res.status(200).json({articles})
                }
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar listar os artigos.',
                error: error.message
              })
        }
    },
    show: async (req, res) =>{
        try {
            const {permalink} = req.params

            redisClient.get(`article${permalink}`, async (err, result) =>{
                if(result){
                    const resultJSON = JSON.parse(result)

                    //Omitting the User Id
                    for (let i = 0; i < resultJSON.comments.length; i++){
                        resultJSON.comments[i].user = undefined
                    }

                    return res.status(200).json({article: resultJSON})
                    }else{
                        const article = await articleModel.findOne({permalink}).populate('authors').populate('comments')

                        if(article === null){
                            res.status(404).json({
                            message: 'Este artigo não existe.'
                            })
                        }
                        if(article.comments){
                          //Omitting the User Id
                          for (let i = 0; i < article.comments.length; i++){
                            article.comments[i].user = undefined
                          }
                        }


                        redisClient.set(`cacheArticle${permalink}`, JSON.stringify(article))
                        redisClient.expire(`cacheArticle${permalink}`, 50)

                        return res.status(200).json({article})
                    }
            })


        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar listar o artigo.',
                error: error.message
              })
        }
    },
    update: async (req, res) =>{
        try {
            const {permalink} = req.params

            const article = await articleModel.findOne({permalink}).populate('authors').populate('comments')
          
            if(!article){
                return res.status(404).json({
                    message: 'Este artigo não existe.'
                })
            }

            await article.set(req.body)
            await article.set({updateDate: Date.now()})
            await article.save()

            //Deleting the cache
            redisClient.del(`cacheArticle${permalink}`)
            redisClient.keys("cacheArticles*", function(err, rows) {
                rows.forEach(key =>{
                 redisClient.del(key)
                })
            })

            return res.status(200).json({
                 message: 'Artigo atualizado com sucesso!'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar atualizar o artigo.',
                error: error.message
              })
        }
    },
    remove: async (req, res) =>{
        try {
            const {permalink} = req.params

            const article = await articleModel.findOne({permalink}).populate('authors').populate('comments')
          
            if(!article){
                return res.status(404).json({
                    message: 'Este artigo não existe.'
                })
            }
            const comments = await commentsModel.find().where({article: article._id})
            
            article.remove()

            //Removing all comments
            comments.forEach(comment => {
                comment.remove()
            })

            //Deleting the cache
            redisClient.del(`cacheArticle${permalink}`)
            redisClient.keys("cacheArticles*", function(err, rows) {
                rows.forEach(key =>{
                redisClient.del(key)
                })
            })


          return res.status(200).json({
                message: 'Artigo deletado com sucesso!'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar deletar o artigo.',
                error: error.message
              })
        }
    }
}