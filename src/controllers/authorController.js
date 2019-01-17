import authorModel from '../models/authorModel'
import articleModel from '../models/articleModel'

module.exports = {
    create: async (req, res) =>{
        try {
            await authorModel.create(req.body)
            
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

            const authors = await authorModel.paginate({}, {offset: parseInt(offset), limit: parseInt(limit)})

            return res.status(200).json({
                authors
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

            const author = await authorModel.findById(id)

            if(author === null){
                res.status(404).json({
                    message: 'Este autor não existe.'
                })
            }

            return res.status(200).json({author})            
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

            //Removing the author reference from the article            
            articles.forEach(article =>{
                article.authors.remove(author)
            })            

            return res.status(200).json({
                message: 'Autor deletado com sucesso!' 
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar deletar o autor.',
                error: error.message
              }) 
        }
    },
}