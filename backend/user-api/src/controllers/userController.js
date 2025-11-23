const User = require('../models/User');

// POST: Menambahkan user baru
exports.createUser = async (req, res) => {
  try {
    // Ambil data dari request body
    const { name, email, age, phone } = req.body;

    // Cek apakah email sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Buat user baru
    const user = await User.create({
      name,
      email,
      age,
      phone
    });

    res.status(201).json({
      success: true,
      message: 'User berhasil dibuat',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET: Mengambil semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET: Mengambil user berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    // Error jika ID tidak valid
    res.status(400).json({
      success: false,
      message: 'ID tidak valid'
    });
  }
};

// DELETE: Menghapus user berdasarkan ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User berhasil dihapus',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'ID tidak valid'
    });
  }
};