if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import swaggerUi from 'swagger-ui-express'
import redis  from 'redis'

let redisClient = redis.createClient(6379, process.env.REDIS_HOST)

function initServer(app, port){
    const PORT = process.env.PORT || port
    const HOST = process.env.HOST || '0.0.0.0'
        
        app.listen(port, HOST, () =>{
            console.log(`App linten on port ${PORT}`)
        })
    
}

function databaseConnection(){
    if(process.env.NODE_ENV === 'test'){
        const database = require('../database/testDB')
        database.connect()
    }
    else if(process.env.NODE_ENV === 'development'){
        const database = require('../database/developmentDB');
        database.connect()
    }
    else if(process.env.NODE_ENV === 'production'){
        const database = require('../database/productionDB');
        database.connect()
    }
}

function redisConnection() {
    redisClient.on('connect', () => console.log('Redis Connected.') )
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
     initSwagger,
     redisClient


 }

