
const Product = require('../models/Product');
const { isValidObjectId } = require('mongoose');

// Enhanced sensor data processing
exports.processSensorData = async (data) => {
  try {
    // 1. Validate input
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }

    const { productId, temperature, humidity } = data;

    if (!productId || !temperature) {
      throw new Error('productId and temperature are required');
    }

    // Validate temperature range (example: -20 to 60°C for agricultural products)
    if (typeof temperature !== 'number' || temperature < -20 || temperature > 60) {
      throw new Error('Temperature must be between -20 and 60°C');
    }

    // Optional humidity validation
    if (humidity && (humidity < 0 || humidity > 100)) {
      throw new Error('Humidity must be between 0-100%');
    }

    // 2. Verify product exists
    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
      throw new Error('Product not found');
    }

    // 3. Create and save reading
    const reading = new Sensor({
      productId,
      temperature: parseFloat(temperature.toFixed(2)), // Store with 2 decimal places
      humidity: humidity ? parseFloat(humidity.toFixed(2)) : null,
      timestamp: new Date()
    });

    const savedReading = await reading.save();
    
    // 4. Update product's last sensor reading reference (optional)
    await Product.findByIdAndUpdate(productId, {
      $set: { lastSensorReading: savedReading._id }
    });

    return savedReading;

  } catch (error) {
    console.error('Sensor data processing failed:', error.message);
    throw error; // Re-throw for controller handling
  }
};

// Get readings with pagination
exports.getByProduct = async (productId, options = {}) => {
  if (!isValidObjectId(productId)) {
    throw new Error('Invalid product ID format');
  }

  const { 
    limit = 100, 
    skip = 0, 
    timeRange = {} 
  } = options;

  const query = { productId };

  // Add time range filtering if provided
  if (timeRange.start || timeRange.end) {
    query.timestamp = {};
    if (timeRange.start) query.timestamp.$gte = new Date(timeRange.start);
    if (timeRange.end) query.timestamp.$lte = new Date(timeRange.end);
  }

  return await Sensor.find(query)
    .sort({ timestamp: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit));
};

// Get latest reading for a product
exports.getLatestReading = async (productId) => {
  return await Sensor.findOne({ productId })
    .sort({ timestamp: -1 })
    .limit(1);
};

// Get temperature statistics
exports.getTemperatureStats = async (productId) => {
  const stats = await Sensor.aggregate([
    { $match: { productId } },
    {
      $group: {
        _id: null,
        avgTemp: { $avg: "$temperature" },
        maxTemp: { $max: "$temperature" },
        minTemp: { $min: "$temperature" },
        readingsCount: { $sum: 1 }
      }
    }
  ]);

  return stats[0] || null;
};