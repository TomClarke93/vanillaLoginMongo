const express = require('express');
const app = express();

app.get('/login', (req, res) => {
    res.send('Login Page')
})
app.get('/register', (req, res) => {
    res.send('Register Page')
})
app.get('/users', (req, res) => {
    res.send('Users Page')
})

app.listen(3000, () => {
    console.log('Server Started');
})