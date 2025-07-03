const express = require('express');
const router = express.Router();
const { generarRecomendacion } = require('../controllers/iaController');

router.post('/recomendar', generarRecomendacion);

module.exports = router;
