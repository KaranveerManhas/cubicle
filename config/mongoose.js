const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const database = mongoose.connection;

database.on('error', console.error.bind("Error connecting to database"));

database.once('open', function(){
    console.log('Connected to database');
});

module.exports = database;