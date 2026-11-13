const Nota = require('../models/Nota');

// Obtener todas las notas (GET)
const obtenerNotas = async (req, res) => {
  try {
    const notas = await Nota.find();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nota nueva (POST)
const crearNota = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const nuevaNota = await Nota.create({ titulo, contenido });
    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  obtenerNotas,
  crearNota,
};
