const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var asignatura = new  Schema({
    nombre: {type: String, text: true},
    carreras: [],
    img: String
  });
  
  asignatura.index({nombre: 'text'});


  mongoose.set('useCreateIndex', true);

  module.exports = mongoose.model('Asignatura', asignatura);