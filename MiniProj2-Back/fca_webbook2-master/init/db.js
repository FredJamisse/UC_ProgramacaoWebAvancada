module.exports = (app, callback) => {
    const CONFIG = require('../config/config');
    const mongoose = require('mongoose');

    // Nova ligação moderna (mongoose 7/8)
    const connection = mongoose.createConnection(CONFIG.mongodb.uri);

    connection.on('connected', () => {
        console.log('---Connected to DB');
        global.mongoConnection = connection;
        return callback();
    });

    connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        throw err;
    });
};
