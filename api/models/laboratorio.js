const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labos = mongoose.model('Laboratorio', new Schema({
    asignatura_id: { type: Schema.Types.ObjectId, ref: 'Asignatura'},
    nombre: String,
    img: String
}))

module.exports = labos;