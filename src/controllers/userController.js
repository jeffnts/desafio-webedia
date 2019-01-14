import userModel from '../models/userModel'

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

        }catch(err){
            return res.status(500).json({
                message: 'Erro no servidor ao tentar cadastrar o usuário.'
              })
        }
    }
}