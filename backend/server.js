const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notasRouter = require('./routes/notas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/notas', notasRouter);

mongoose
  .connect('mongodb://127.0.0.1:27017/notas-rapidas')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Error al conectar a MongoDB:', err));
