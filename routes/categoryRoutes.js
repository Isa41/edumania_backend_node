const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', async (req, res) => {
    try {
		const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const categories = await Category.find()
            .populate('language')
            .skip((page - 1) * size)
            .limit(size);

        const totalItems = await Category.countDocuments();
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

router.get('/language/:languageId', async (req, res) => {
    try {
        const languageId = req.params.languageId;
        const page = parseInt(req.query.page) || 1;  
        const size = parseInt(req.query.size) || 10; 

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

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('language');
        if (category == null) {
            return res.status(404).json({ message: 'No category' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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

router.put('/:id', async (req, res) => {
    try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const id = new mongoose.Types.ObjectId(req.params.id); 
        const category = await Category.findById(id);
        if (category == null) {
            return res.status(404).json({ message: 'No category' });
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

router.patch('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'No category' });
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

router.delete('/:id', async (req, res) => {
    try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const id = new mongoose.Types.ObjectId(req.params.id); 

		const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'No category found to delete' });
        }
		
        res.json({ message: 'category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
