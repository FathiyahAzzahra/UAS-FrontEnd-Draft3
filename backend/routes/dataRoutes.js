const express = require('express');
const router = express.Router(); // Pastikan router diinisialisasi di awal
const DataModel = require('../models/dataModel'); // Pastikan file ini ada

router.post('/', async (req, res) => {
    try {
        // Validasi sederhana
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Simpan ke MongoDB
        const newUser = new DataModel({
            username: req.body.username,
            password: req.body.password, // Ini hanya contoh. Jangan simpan password langsung, gunakan hashing!
        });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User registered successfully', data: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





const User = require('../models/dataModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'All fields are required' });

        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'Username already exists' });

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected Route Example
router.get('/profile', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
