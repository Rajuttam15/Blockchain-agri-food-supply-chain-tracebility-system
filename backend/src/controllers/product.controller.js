const Product = require('../models/Product');
const { getContract } = require('../config/blockchain');

exports.registerProduct = async (req, res) => {
  try {
    // 1. Save to DB
    const product = new Product({
      ...req.body,
      farmer: req.user.address,
      ipfsHash: await ipfsService.upload(req.body.certificate)
    });
    await product.save();

    // 2. Blockchain registration
    const contract = getContract('productRegistry');
    const tx = await contract.registerProduct(
      product.origin,
      product.ipfsHash
    );
    await tx.wait();

    res.status(201).json({ product, txHash: tx.hash });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProductHistory = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const contract = getContract('productRegistry');
    
    const [blockchainData, sensorData] = await Promise.all([
      contract.getProduct(product.blockchainId),
      sensorService.getByProduct(product._id)
    ]);

    res.json({ product, blockchainData, sensorData });
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
};