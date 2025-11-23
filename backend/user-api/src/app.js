const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');

const app = express();

// Middleware untuk parsing JSON
// awal request dapetnya raw data mentah misal {10byte}{15byte}{...}
// middleware ini akan mengubahnya menjadi format JSON yang bisa dipakai di route
app.use(express.json());

// Middleware untuk parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Route utama (dokumentasi)
app.get('/', (req, res) => {
  res.json({
    message: 'User API Service',
    version: '1.0.0',
    endpoints: {
      createUser: 'POST /api/users',
      getAllUsers: 'GET /api/users',
      getUserById: 'GET /api/users/:id',
      deleteUser: 'DELETE /api/users/:id'
    }
  });
});

app.use(logger);

// API Routes dengan prefix /api
app.use('/api', userRoutes);

// Middleware untuk handle 404 - Not Found
app.use(notFound);

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;