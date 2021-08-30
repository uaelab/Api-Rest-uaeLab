const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guia = mongoose.model('Guia', new Schema({
    laboratorio_id: { type: Schema.Types.ObjectId, ref: 'Laboratorio'},
    nombre: String,
    url: String
}));

module.exports = guia;