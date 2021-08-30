const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const cors = require('cors');

const biblioteca = require('./routes/biblioteca');
//const material = require('./routes/material');
const guias = require('./routes/guia');
const laboratorios = require('./routes/laboratorio');
const asignaturas = require('./routes/asignatura');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/api/biblioteca', biblioteca);
//app.use('/api/material', material);
app.use('/api/guias', guias);
app.use('/api/laboratorios', laboratorios);
app.use('/api/asignaturas', asignaturas);

module.exports = app;

/*module.exports = (req, res) => {
    res.send('Hola Mundo, esta es mi primera api-rest en un serverless!!')
};*/