const app = require('./app');
const { connectDB } = require('./config/database');
const { initBlockchain } = require('./config/blockchain');

const PORT = process.env.PORT || 5000;

async function start() {
  // 1. Connect to DB
  await connectDB();
  
  // 2. Initialize blockchain connection
  await initBlockchain();
  
  // 3. Start server
  app.listen(PORT, () => {
    console.log(`
    Server running on port ${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    `);
  });
}

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

start();