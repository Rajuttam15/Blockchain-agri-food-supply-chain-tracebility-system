const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  temperature: { type: Number, required: true },
  humidity: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sensor', SensorSchema);