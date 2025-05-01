const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const sensorRoutes = require('./routes/sensor.routes');
const { errorHandler } = require('./middleware/error');

const app = express();

// 1. Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per window
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// 3. Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 4. CORS Configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// 5. Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 6. Static Files (if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 7. Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sensor', sensorRoutes);

// 8. Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running'
  });
});

// 9. Handle 404
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 10. Global Error Handler
app.use(errorHandler);

module.exports = app;