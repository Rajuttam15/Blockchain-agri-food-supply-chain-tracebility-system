const { getContract } = require('../config/blockchain');

async function registerProduct(productData) {
  const contract = getContract();
  const tx = await contract.registerProduct(
    productData.origin,
    productData.ipfsHash
  );
  await tx.wait();
  return tx.hash;
}

async function getProduct(productId) {
  const contract = getContract();
  return await contract.getProduct(productId);
}

module.exports = { registerProduct, getProduct };