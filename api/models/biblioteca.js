const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var biblio = new  Schema({
    nombre: {type: String, text: true},
    categoria : String,
    año: String,
    url: String,
    img: String
  });
  
  biblio.index({nombre: 'text'});

  mongoose.set('useCreateIndex', true);

  module.exports = mongoose.model('Biblioteca', biblio);