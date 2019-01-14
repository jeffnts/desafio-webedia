const mongoose = require('mongoose');

module.exports ={

    connect: () =>{
        mongoose.connect(process.env.URL_DB_DEVELOPMENT, {useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        mongoose.connection.once('open', () =>{
            console.log('Database connected.');
        });
    }
};

