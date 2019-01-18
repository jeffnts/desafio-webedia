require('dotenv').config()
import swaggerUi from 'swagger-ui-express'
import redis from 'redis'


function initServer(app, port){
    const PORT = process.env.PORT || port
    const HOST = process.env.HOST || '0.0.0.0'
        
        app.listen(port, HOST, () =>{
            console.log(`App linten on port ${PORT}`)
        })
    
}

function databaseConnection(){
    if(process.env.NODE_ENV === 'test'){
        const database = require('../database/test')
        database.connect()
    }
    else if(process.env.NODE_ENV === 'development'){
        const database = require('../database/development');
        database.connect()
    }
    else if(process.env.NODE_ENV === 'production'){
        const database = require('../database/production');
        database.connect()
    }
}

function redisConnection(){
    // let client = redis.createClient()
    // client.on('connect', () =>{
    //     console.log('Connected to Redis.')
    // })
}

function initSwagger(app){   
    const swaggerFile = require('../../docs/swagger.json')
    swaggerFile.host = process.env.URL_SWAGGER
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

 module.exports  = {     
     initServer,
     databaseConnection,
     redisConnection,
     initSwagger
    
 }