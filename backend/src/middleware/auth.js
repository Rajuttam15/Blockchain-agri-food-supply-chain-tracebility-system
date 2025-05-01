const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // 1. Get token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Authentication required');

    // 2. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Verify on-chain (optional)
    // const isVerified = await checkOnChainAuth(decoded.address);
    // if (!isVerified) throw new Error('Not verified on blockchain');

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};