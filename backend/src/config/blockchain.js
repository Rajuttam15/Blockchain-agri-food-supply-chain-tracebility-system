const { ethers } = require('ethers');
const ProductRegistryABI = require('../../../artifacts/contracts/ProductRegistry.sol/ProductRegistry.json');

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contracts = {
  productRegistry: new ethers.Contract(
    process.env.PRODUCT_REGISTRY_ADDRESS,
    ProductRegistryABI.abi,
    wallet
  )
};

const getContract = (name) => {
  if (!contracts[name]) throw new Error(`Contract ${name} not initialized`);
  return contracts[name];
};

module.exports = { getContract, provider };