// backend/src/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  farmer: String,
  origin: String,
  ipfsHash: String,
  translations: {
    en: { name: String, description: String },
    hi: { name: String, description: String }
  }
});

module.exports = mongoose.model('Product', ProductSchema);