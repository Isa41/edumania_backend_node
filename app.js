const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const languageRoutes = require('./routes/languageRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB bağlantısı başarılı');
}).catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
});

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/questions', questionRoutes);

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
