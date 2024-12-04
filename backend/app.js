const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes'); // Mengimpor dataRoutes
const User = require('./models/dataModel');
const cors = require('cors');
const path = require('path');

// Setup Express app
const app = express();
const PORT = 3000;

// Middleware untuk CORS
app.use(cors()); // Mengaktifkan CORS untuk semua domain

// Middleware untuk Body Parsing
app.use(bodyParser.json());

// Serve static files dari frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Route fallback untuk single-page application (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// backend/app.js
mongoose.connect('mongodb://127.0.0.1:27017/angularjs_db')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/data', dataRoutes);  // Data routes diatur melalui dataRoutes

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
