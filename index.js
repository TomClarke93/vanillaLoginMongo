const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost/vanillaLoginMongo', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'secret'}));

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        req.session.userId = user._id;
        res.redirect('/users');
    } else {
        res.redirect('/login');
    }
})

app.post('/logout',(req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/users', (req, res) => {
    if(req.session.userId){
        res.render('users/index');
    } else {
        res.redirect('/login');
    }
})

app.post('/register', async (req, res) => {
    const {username, password} = req.body.newUser;
    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({
        username,
        password: hash
    });
    await newUser.save();
    res.redirect('/login');
})

app.listen(3000, () => {
    console.log('Server Started');
})