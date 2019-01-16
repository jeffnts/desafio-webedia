import articleModel from '../models/articleModel'
import authorModel from '../models/authorModel'
import commentsModel from '../models/commentsModel'

module.exports = {
    create: async (req, res) =>{
        try {
            const {authors} = req.body

            if( await !authors){
                return res.status(406).json({
                    message: 'É obrigatório um artigo ter autor!'
                })
            }

            const author = await authorModel.findById(authors)

            if(author === null){
                return res.status(404).json({
                    message: 'Este autor não existe.'
                })
            }

            await articleModel.create(req.body)
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

            const articles = await articleModel.paginate({}, {offset: parseInt(offset), limit: parseInt(limit), populate: ['authors', 'comments']}) 
            
            //Omitting the User Id 
            articles.docs.forEach(elements =>{
                for(let i = 0; i < elements.comments.length; i++){
                    elements.comments[i].user = undefined
                }
                
            })

            

            return res.status(200).json( {articles} )
            
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

            const article = await articleModel.findOne({permalink}).populate('authors').populate('comments')
          
            if(article === null){
                res.status(404).json({
                    message: 'Este artigo não existe.'
                })
            }
        
            //Omitting the User Id 
            for (let i = 0; i < article.comments.length; i++){
                article.comments[i].user = undefined                            
            }
            
            return res.status(200).json({article})
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
          
            if(article === null){
                res.status(404).json({
                    message: 'Este artigo não existe.'
                })
            }

            await article.set(req.body)
            await article.set({updateDate: Date.now()})
            await article.save()
               
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
          
            if(article === null){
                res.status(404).json({
                    message: 'Este artigo não existe.'
                })
            }
            const comments = await commentsModel.find().where({article: article._id})
            
            article.remove()

            //Removing all comments
            comments.forEach(comment => {
                comment.remove()
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