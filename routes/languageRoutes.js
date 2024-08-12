const express = require('express');
const router = express.Router();
const Language = require('../models/language');

router.get('/', async (req, res) => {
    try {
        const languages = await Language.find();
        res.json(languages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (language == null) {
            return res.status(404).json({ message: 'Dil bulunamadı' });
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

router.patch('/:id', async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (language == null) {
            return res.status(404).json({ message: 'Dil bulunamadı' });
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
        const language = await Language.findById(req.params.id);
        if (language == null) {
            return res.status(404).json({ message: 'Dil bulunamadı' });
        }

        await language.remove();
        res.json({ message: 'Dil silindi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
