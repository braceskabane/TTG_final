// Global error handler middleware
// Menangkap unexpected errors yang lolos dari try-catch
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Default error status
  const statusCode = err.statusCode || 500;

  // Response error
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada server',
    // Tampilkan stack trace hanya di development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;

// Parameter pertama err adalah error object yang di-throw atau dikirim via next(err)