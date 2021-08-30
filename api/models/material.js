const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const material = mongoose.model('Material', new Schema({
    guia_id: { type: Schema.Types.ObjectId, ref: 'Guia'},
    nombre: String,
    url: String,
}))

module.exports = material;