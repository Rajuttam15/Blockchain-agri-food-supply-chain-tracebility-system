const { getContract } = require('../config/blockchain');

const checkRole = (role) => async (req, res, next) => {
  try {
    const contract = getContract('productRegistry');
    const hasRole = await contract.hasRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes(role)),
      req.user.address
    );
    
    if (!hasRole) throw new Error(`Requires ${role} role`);
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = {
  isFarmer: checkRole('FARMER'),
  isProcessor: checkRole('PROCESSOR')
};