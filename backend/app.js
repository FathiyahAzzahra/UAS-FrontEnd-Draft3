const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes'); // Mengimpor dataRoutes
const User = require('./models/dataModel');
const cors = require('cors');
const path = require('path');
const dailyWellnessRoutes = require('./routes/dailyWellnessRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const selfcareRoutes = require('./routes/selfcareRoutes');
const multer = require('multer');
// const authRoutes = require('./routes/authRoutes'); // Menambahkan route untuk autentikasi


// Setup Express app
const app = express();
const PORT = process.env.PORT || 3000; // Menggunakan port yang dapat diubah lewat environment variables


// Middleware untuk CORS
app.use(cors()); // Mengaktifkan CORS untuk semua domain


// Middleware
app.use(cors({
    allowedHeaders: ['Authorization', 'Content-Type']  // Explicitly allow Authorization header
}))
app.use(bodyParser.json()); // Menggunakan body parser untuk JSON
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve frontend files

// Routes
app.use('/api/data', dataRoutes); // Route untuk data umum
app.use('/api/dailyWellness', dailyWellnessRoutes); // Route untuk wellness data
app.use('/api/discussions', discussionRoutes);
app.use('/api/sounds', selfcareRoutes);
// app.use('/api/auth', authRoutes); // Menambahkan route untuk autentikasi pengguna (login/register)
app.use('./uploads', express.static(path.join(__dirname, 'uploads')));



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

app.get('/selfcare', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/selfcare.html'));
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

