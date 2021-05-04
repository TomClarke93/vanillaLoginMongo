const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');

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

app.listen(3000, () => {
    console.log('Server Started');
})