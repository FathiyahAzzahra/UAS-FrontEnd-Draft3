const express = require('express');
const router = express.Router();
const Sound = require('../models/soundModels');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/selfcare');
        
        // Ensure the directory exists
        fs.exists(uploadPath, (exists) => {
            if (!exists) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });

router.get('/:username', async (req, res) => {
    try {
        const sounds = await Sound.find({ username: req.params.username });
        res.json(sounds);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sounds', error });
    }
});

// POST upload a new sound
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { title, description, username } = req.body;

        // Periksa apakah file dikirim
        if (!req.file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const file = `/uploads/selfcare/${req.file.filename}`;

        const newSound = new Sound({
            title,
            description,
            file,
            username,
        });

        const savedSound = await newSound.save();
        res.status(201).json({ message: 'Sound uploaded successfully', sound: savedSound });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload sound', error });
    }
});


// router.delete('/:id', async (req, res) => {
//     try {
//         const sound = await Sound.findById(req.params.id);
//         if (!sound) {
//             return res.status(404).json({ message: 'Sound not found' });
//         }

//         // Optionally: delete the file from the file system here
//         await Sound.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Sound deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete sound', error });
//     }
// });

router.put('/:id', (req, res) => {
    Sound.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedSound => res.json(updatedSound))
        .catch(error => res.status(400).send('Error updating sound'));
});

router.delete('/:id', (req, res) => {
    Sound.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send('Sound deleted successfully!'))
        .catch(error => res.status(400).send('Error deleting sound'));
});


module.exports = router;
