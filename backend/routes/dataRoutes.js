const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/dataModel');
const router = express.Router();
require('dotenv').config()


// Middleware untuk memeriksa token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // Simpan ID pengguna ke request untuk digunakan nanti
        next();
    });
};

// Route untuk mengambil profil pengguna
// Route untuk mengambil profil pengguna
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId); // Ambil pengguna berdasarkan ID dari token
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            username: user.username,
            fullName: user.fullName,
            pronouns: user.pronouns,
            bio: user.bio,
            profilePicture: user.profilePicture
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route untuk memperbarui profil pengguna
router.put('/profile', authenticateToken, async (req, res) => {
    const { fullName, pronouns, bio, profilePicture } = req.body;
    const updateFields = {};

    if (fullName) updateFields.fullName = fullName;
    if (pronouns) updateFields.pronouns = pronouns;
    if (bio) updateFields.bio = bio;
    if (profilePicture) updateFields.profilePicture = profilePicture;

    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            updateFields,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});




// Menghapus profil pengguna
router.delete('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Account successfully deleted' });
    } catch (error) {
        console.error(error); // Log error untuk debugging
        res.status(500).json({ message: 'Error deleting account' });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari pengguna berdasarkan email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Email atau password salah' });
        }

        // Verifikasi password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_TOKEN, { expiresIn: '1h' });

        // Kirim token dan username ke frontend
        res.status(200).json({ message: 'Login berhasil', token, username: user.username });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
});


// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; // Pastikan router diekspor
