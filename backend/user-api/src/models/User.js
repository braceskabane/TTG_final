const mongoose = require('mongoose');

// Definisi Schema untuk User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Format email tidak valid']
  },
  age: {
    type: Number,
    min: [0, 'Umur tidak boleh negatif']
  },
  phone: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

// Export model
module.exports = mongoose.model('User', userSchema);