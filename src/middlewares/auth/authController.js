import userModel from '../../models/userModel'
import jwt from 'jsonwebtoken'

module.exports = {

        authenticate: async (req, res) =>{
            try{
                const {userName, password} = req.body

                const user = await userModel .findOne({userName}).select('password')

                if(await user === null){
                    return res.status(404).json({
                        messaga: 'Usuário não encontrado!'
                    })
                }

                const authenticate = await user.authenticate(password)
                if(!authenticate){
                    return res.status(400).json({
                        message: 'Usuário não autenticado.'
                    })
                }
                const  token =  `${jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d'})}`

                return res.status(200).json({
                    token
                })

            }catch(error){
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar cadastrar o usuário.',
                    error
                  })
            }
        },
        isAuthenticated: async (req, res, next) =>{
            try{
                const {token} = req.headers

                if(!token){
                    return res.status(401).json({
                        message: 'Usuário não autenticado!'
                    })
                }

                const { id } = await jwt.verify(token.trim(), process.env.SECRET_KEY)
                res.user = {
                    id,
                };
                return next()

            }catch(error){
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar cadastrar o usuário.',
                    error
                  })
            }
        }
}