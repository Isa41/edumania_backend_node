const express = require('express');
const router = express.Router();
const Language = require('../models/language');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
		const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const languages = await Language.find()
            .skip((page - 1) * size)
            .limit(size);

        const totalItems = await Language.countDocuments();
        const totalPages = Math.ceil(totalItems / size);

        res.json({
            data: languages,
            page,
            size,
            totalPages,
            totalItems
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (language == null) {
            return res.status(404).json({ message: 'No language' });
        }
        res.json(language);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const language = new Language({
        image: req.body.image,
        name: req.body.name,
        languageCode: req.body.languageCode,
    });
    try {
        const newLanguage = await language.save();
        res.status(201).json(newLanguage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const id = new mongoose.Types.ObjectId(req.params.id); 
        const language = await Language.findById(id);
        if (language == null) {
            return res.status(404).json({ message: 'No language' });
        }

        if (req.body.image != null) {
            language.image = req.body.image;
        }
        if (req.body.name != null) {
            language.name = req.body.name;
        }
        if (req.body.languageCode != null) {
            language.languageCode = req.body.languageCode;
        }

        const updatedLanguage = await language.save();
        res.json(updatedLanguage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (language == null) {
            return res.status(404).json({ message: 'No language' });
        }

        if (req.body.image != null) {
            language.image = req.body.image;
        }
        if (req.body.name != null) {
            language.name = req.body.name;
        }
        if (req.body.languageCode != null) {
            language.languageCode = req.body.languageCode;
        }

        const updatedLanguage = await language.save();
        res.json(updatedLanguage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const id = new mongoose.Types.ObjectId(req.params.id); 

		const language = await Language.findByIdAndDelete(id);

        if (!language) {
            return res.status(404).json({ message: 'No language found to delete' });
        }
		
        res.json({ message: 'Language deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
