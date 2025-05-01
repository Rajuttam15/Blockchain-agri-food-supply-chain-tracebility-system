const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensor.controller');
const { authenticateDevice } = require('../middleware/deviceAuth');

// Public endpoint for IoT devices
router.post('/data', authenticateDevice, sensorController.handleSensorData);

// Protected admin endpoint
router.get('/data/:productId', authMiddleware, sensorController.getSensorData);

module.exports = router;