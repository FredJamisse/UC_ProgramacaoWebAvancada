const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({
    nome: { type: String, required: true },
    contacto: { type: String, required: true },
    animalPatrocinado: {
        type: String,
        ref: CONFIG.mongodb.collections.animal,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);
