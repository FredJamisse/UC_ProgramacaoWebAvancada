const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const expertSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    contacto: {
        type: String,
        required: true,
        trim: true
    },
    area: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, expertSchema);
