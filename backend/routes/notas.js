const express = require('express');
const { obtenerNotas, crearNota } = require('../controllers/notaController');

const router = express.Router();

// GET /api/notas
router.get('/', obtenerNotas);

// POST /api/notas
router.post('/', crearNota);

module.exports = router;
