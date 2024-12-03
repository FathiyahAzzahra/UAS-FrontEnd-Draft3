const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dataRoutes = require('./routes/dataRoutes');
const dailyWellnessRoutes = require('./routes/dailyWellnessRoutes');
// const authRoutes = require('./routes/authRoutes'); // Menambahkan route untuk autentikasi

const app = express();
const PORT = process.env.PORT || 3000; // Menggunakan port yang dapat diubah lewat environment variables

// Middleware
app.use(bodyParser.json()); // Menggunakan body parser untuk JSON
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve frontend files

// Routes
app.use('/api/data', dataRoutes); // Route untuk data umum
app.use('/api/dailyWellness', dailyWellnessRoutes); // Route untuk wellness data
// app.use('/api/auth', authRoutes); // Menambahkan route untuk autentikasi pengguna (login/register)

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/angularjs_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Serve frontend assets
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Serve React/Vue/Angular frontend
});

// Handle registration route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/register.html')); // Serve registration page
});

// Fallback for unknown routes (optional)
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
