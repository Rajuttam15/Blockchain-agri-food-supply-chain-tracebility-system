const { create } = require('ipfs-http-client');
const fs = require('fs');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(`${process.env.IPFS_API_KEY}:${process.env.IPFS_API_SECRET}`).toString('base64')}`
  }
});

exports.upload = async (filePath) => {
  const file = fs.readFileSync(filePath);
  const { cid } = await ipfs.add(file);
  return cid.toString();
};