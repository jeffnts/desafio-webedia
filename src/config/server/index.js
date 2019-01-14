require('dotenv').config()


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
}

function login(app, port){
    const HOST = process.env.HOST || '0.0.0.0'
    app.listen(port,HOST, ()=>{
        console.log(`App linten on port ${port}`)
    })
}
 module.exports  = {     
     initServer,
     databaseConnection,
     login
 }