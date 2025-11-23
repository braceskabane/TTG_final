// Middleware untuk handle route yang tidak ditemukan
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} tidak ditemukan`
  });
};

module.exports = notFound;

// next: Fungsi untuk melanjutkan ke middleware berikutnya