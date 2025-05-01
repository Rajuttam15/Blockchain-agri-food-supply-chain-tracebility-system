const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authenticate } = require('../middleware/auth');
const { isFarmer } = require('../middleware/role');

router.post('/', authenticate, isFarmer, productController.registerProduct);
router.get('/:id', authenticate, productController.getProductHistory);

module.exports = router;