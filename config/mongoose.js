const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/emprs');

const database = mongoose.connection;

database.on('error', console.error.bind("Error connecting to database"));

database.once('open', function(){
    console.log('Connected to database');
});

module.exports = database;