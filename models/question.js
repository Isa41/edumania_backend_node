const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    word: { type: String, required: true, maxlength: 50 },
    meaning: { type: String, maxlength: 50 },
    example1: String,
    exampleMeaning1: String,
    example2: String,
    exampleMeaning2: String,
    example3: String,
    exampleMeaning3: String,
    example4: String,
    exampleMeaning4: String,
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

module.exports = mongoose.model('Question', QuestionSchema);
