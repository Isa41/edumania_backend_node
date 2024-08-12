const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// GET tüm kategoriler
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().populate('language');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Belirli bir Language ID'ye göre kategorileri getir (sayfalı)
router.get('/language/:languageId', async (req, res) => {
    try {
        const languageId = req.params.languageId;
        const page = parseInt(req.query.page) || 1;  // Varsayılan olarak 1. sayfa
        const size = parseInt(req.query.size) || 10;  // Varsayılan olarak 10 öğe

        const categories = await Category.find({ language: languageId })
            .populate('language')
            .skip((page - 1) * size)
            .limit(size);

        const totalItems = await Category.countDocuments({ language: languageId });
        const totalPages = Math.ceil(totalItems / size);

        res.json({
            data: categories,
            page,
            size,
            totalPages,
            totalItems
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET belirli bir kategori
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('language');
        if (category == null) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST yeni bir kategori oluştur
router.post('/', async (req, res) => {
    const category = new Category({
        image: req.body.image,
        name: req.body.name,
        language: req.body.language,
        tag: req.body.tag,
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH bir kategori güncelle
router.patch('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }

        if (req.body.image != null) {
            category.image = req.body.image;
        }
        if (req.body.name != null) {
            category.name = req.body.name;
        }
        if (req.body.language != null) {
            category.language = req.body.language;
        }
        if (req.body.tag != null) {
            category.tag = req.body.tag;
        }

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE bir kategori sil
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }

        await category.remove();
        res.json({ message: 'Kategori silindi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
