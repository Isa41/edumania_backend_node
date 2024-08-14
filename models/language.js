const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    image: String,
    name: { type: String, required: true, maxlength: 20 },
    languageCode: { type: String, maxlength: 20 },
});

module.exports = mongoose.model('Language', LanguageSchema);
