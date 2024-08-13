const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    image: String,
    name: { type: String, required: true, maxlength: 40 },
    language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
    tag: { type: String, maxlength: 20 },
	versionKey: false, 
});

module.exports = mongoose.model('Category', CategorySchema);
