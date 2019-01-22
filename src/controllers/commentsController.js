import commentsModel from '../models/commentsModel'
import articleModel from '../models/articleModel'
import userModel from '../models/userModel'

import {redisClient} from '../config/server'

import jwt from 'jsonwebtoken'


module.exports ={
    create: async (req, res) =>{
        try {
            const {token} = req.headers             
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

            const user = await userModel.findById(id)

            
            const {permalink} = req.params
            const article = await articleModel.findOne({permalink})
           
            if(!article){
                return res.status(404).json({
                    message: 'Artigo não encontrado'
                })
            }
                
            const comment = await commentsModel.create({
                content: req.body.content,
                user,
                article
            })
            
            article.comments.push(comment)
            article.save()

            //Deleting cache
            redisClient.keys("cacheComments*", function(err, rows) {
                rows.forEach(key =>{
                redisClient.del(key)
                })
            })
            return res.status(201).json({
                message: 'Comentário cadastrado com sucesso!'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar cadastrar o comentário.',
                error: error.message
              })
        }
    }, 
    list: async (req, res) =>{
        try {
            const {token} = req.headers             
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)
            
            const{permalink} = req.params
            const{offset, limit} = req.query

            const user = await userModel.findById(id)
            const article = await articleModel.findOne({permalink})

            if(article === null){
              return res.status(404).json({message: 'Este artigo não existe.'})
            }

            redisClient.get(`cacheComments${user}${article}${offset}${limit}`, async (err, result)=>{
                if(result){
                  const resultJSON = JSON.parse(result)

                  return res.status(200).json({comments: resultJSON})
                }else{
                    const comments = await commentsModel.paginate({user, article}, {offset: parseInt(offset), limit: parseInt(limit)})

                    redisClient.set(`cacheComments${user._id}${article._id}${offset}${limit}`, JSON.stringify(comments))
                    redisClient.expire(`cacheComments${user._id}${article._id}${offset}${limit}`, 50)

                    return res.status(200).json({comments})
                }
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar listar os comentários.',
                error: error.message
              })
        }

    },
    update: async (req , res) =>{
        try {
            const {token} = req.headers             
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)
            
            const{permalink, commentId} = req.params

            const user = await userModel.findById(id)
            const article = await articleModel.findOne({permalink})
            
            const comment = await commentsModel.findById(commentId).where({user, article})

            if(!comment || !article){
                return res.status(404).json({
                    message: 'Comentário ou artigo não encontrado.'
                })
            }

            if(!(comment.user == id)){
                return res.status(401).json({
                    message: 'Usuário Não autorizado.'
                }) 
            }

            await comment.set(req.body)
            await comment.save()

            //Deleting cache
            redisClient.keys("cacheComments*", function(err, rows) {
                rows.forEach(key =>{
                redisClient.del(key)
                })
            })

            return res.status(200).json({
                message: 'Comentário atualizado com sucesso!'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar atualizar o comentários.',
                error: error.message
              })
        }      
    },
    remove: async (req, res) =>{
        try {
            const {token} = req.headers             
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)
            
            const{permalink, commentId} = req.params

            const user = await userModel.findById(id)
            const article = await articleModel.findOne({permalink})
            
            const comment = await commentsModel.findById(commentId).where({user, article})

            if(comment === null || article === null){
                return res.status(404).json({
                    message: 'Comentário ou artigo não encontrado.'
                })
            }
                
            if(!(comment.user == id)){
                return res.status(401).json({
                    message: 'Usuário Não autorizado'
                }) 
            }

            await comment.remove()
            article.comments.remove(comment)
            article.save()

            //Deleting cache
            redisClient.keys("cacheComments*", function(err, rows) {
                rows.forEach(key =>{
                redisClient.del(key)
                })
            })

            return res.status(200).json({
                message: 'Comentário removido com sucesso!',
                             
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar deletar o comentário.',
                error: error.message
              })
        }
        
    }
}