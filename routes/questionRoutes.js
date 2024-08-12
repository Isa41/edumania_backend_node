const express = require('express');
const router = express.Router();
const Question = require('../models/question');

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().populate('language').populate('category');
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('language').populate('category');
        if (question == null) {
            return res.status(404).json({ message: 'Soru bulunamadı' });
        }
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const question = new Question({
        word: req.body.word,
        meaning: req.body.meaning,
        example1: req.body.example1,
        exampleMeaning1: req.body.exampleMeaning1,
        example2: req.body.example2,
        exampleMeaning2: req.body.exampleMeaning2,
        example3: req.body.example3,
        exampleMeaning3: req.body.exampleMeaning3,
        example4: req.body.example4,
        exampleMeaning4: req.body.exampleMeaning4,
        language: req.body.language,
        category: req.body.category,
    });
    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question == null) {
            return res.status(404).json({ message: 'Soru bulunamadı' });
        }

        if (req.body.word != null) {
            question.word = req.body.word;
        }
        if (req.body.meaning != null) {
            question.meaning = req.body.meaning;
        }
        if (req.body.example1 != null) {
            question.example1 = req.body.example1;
        }
        if (req.body.exampleMeaning1 != null) {
            question.exampleMeaning1 = req.body.exampleMeaning1;
        }
        if (req.body.example2 != null) {
            question.example2 = req.body.example2;
        }
        if (req.body.exampleMeaning2 != null) {
            question.exampleMeaning2 = req.body.exampleMeaning2;
        }
        if (req.body.example3 != null) {
            question.example3 = req.body.example3;
        }
        if (req.body.exampleMeaning3 != null) {
            question.exampleMeaning3 = req.body.exampleMeaning3;
        }
        if (req.body.example4 != null) {
            question.example4 = req.body.example4;
        }
        if (req.body.exampleMeaning4 != null) {
            question.exampleMeaning4 = req.body.exampleMeaning4;
        }
        if (req.body.language != null) {
            question.language = req.body.language;
        }
        if (req.body.category != null) {
            question.category = req.body.category;
        }

        const updatedQuestion = await question.save();
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question == null) {
            return res.status(404).json({ message: 'Soru bulunamadı' });
        }

        await question.remove();
        res.json({ message: 'Soru silindi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
