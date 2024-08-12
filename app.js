const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const languageRoutes = require('./routes/languageRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/categories', categoryRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/questions', questionRoutes);

app.listen(PORT, () => {
    console.log(`Server run this port: http://localhost:${PORT}`);
});
