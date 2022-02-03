const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb://localhost/social-work';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log('App running on port ${PORT}!');
});
