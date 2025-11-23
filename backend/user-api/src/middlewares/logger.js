// Middleware untuk logging setiap request
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  // Lanjutkan ke middleware berikutnya
  next();
};

module.exports = logger;