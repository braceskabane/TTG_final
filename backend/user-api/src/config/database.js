
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Koneksi ke MongoDB dengan options
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout setelah 5 detik
    });
    
    console.log('✅ MongoDB terhubung dengan sukses');
  } catch (error) {
    console.error('❌ Error koneksi MongoDB:', error.message);
    console.log('💡 Tip: Pastikan MongoDB berjalan di Docker dengan "docker-compose up -d"');
    // Keluar dari aplikasi jika gagal koneksi
    process.exit(1);
  }
};

// Event listeners untuk monitoring koneksi
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB terputus');
});

mongoose.connection.on('connected', () => {
  console.log('🔗 MongoDB terhubung');
});

module.exports = connectDB;