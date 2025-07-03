const express = require('express');
const router = express.Router();
const { generarPDF } = require('../controllers/pdfController');

router.get('/:pacienteId', generarPDF);

module.exports = router;
