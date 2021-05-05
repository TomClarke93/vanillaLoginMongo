const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vanillaLoginMongo', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/users', (req, res) => {
    res.render('users/index');
})

app.post('/users', (req, res) => {
    res.redirect('/login');
})

app.listen(3000, () => {
    console.log('Server Started');
})