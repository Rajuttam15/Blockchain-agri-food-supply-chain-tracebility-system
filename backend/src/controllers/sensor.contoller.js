const sensorService = require('../services/sensor.service');

exports.handleSensorData = async (req, res) => {
  try {
    const data = await sensorService.processSensorData(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSensorData = async (req, res) => {
  try {
    const data = await sensorService.getByProduct(req.params.productId);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Data not found' });
  }
};