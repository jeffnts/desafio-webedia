import userModel from '../models/userModel'

import jwt from 'jsonwebtoken'

module.exports = {

    create: async (req, res) =>{
        try{           
            console.log
            if(await userModel.findOne({userName})){
                return res.status(403).json({
                    message: 'Nome de usuário já está sendo usado!'
                })
            }
                
            
            await userModel.create(req.body)

            return res.status(201).json({
                message: 'Usuário criado com sucesso!'
            })

        }catch(error){
            return res.status(500).json({
                message: 'Erro no servidor ao tentar encontrar o usuário.',
                error
              })
        }
    },
    show: async (req, res) =>{
        try {
            const {token} = req.headers             
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

            const user = await userModel.findById(id)

            if(!user){
                res.status(404).json({
                    message: 'Usuário não encontrado!'
                })
            }

            return res.status(200).json({user})
            
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar encontrar o usuário.',
                error
              })
        }
    },
    update: async (req, res) =>{
        try {
            const {token} = req.headers             
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

            const user = await userModel.findById(id)

            if(!user){
                res.status(404).json({
                    message: 'Usuário não encontrado!'
                })
            }
            
            await user.set(req.body)
            await user.save()
            
            return res.status(200).json({
                message: 'Usuário atualizado com sucesso!'
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar atualizar o usuário.',
                error
              })
        }
    },
    remove: async (req, res) =>{
        try {
            const {token} = req.headers             
            const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)

            const user = await userModel.findById(id)

            if(!user){
                res.status(404).json({
                    message: 'Usuário não encontrado!'
                })
            }
            
            await user.remove()

            return res.status(200).json({
                message: 'Usuário deletado com sucesso!'
            })
            
        } catch (error) {
            return res.status(500).json({
                message: 'Erro no servidor ao tentar deletar o usuário.',
                error
              })  
        }
    }
}