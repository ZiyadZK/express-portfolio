const express = require('express');
const { cookie } = require('express/lib/response');
const sendEmail = require('../models/email');

const router = express.Router();

router
.get('/send_email', (req, res) => {
    const email_response = sendEmail(`${process.env.EMAIL_USER}`, 'kakangtea74@gmail.com', 'test', 'test', 'test');
    console.log(email_response);
    res.redirect('/login');
}) 

.get('/register', (req, res) => {
    res
    .render('auth/register')
})

.get('/verify', (req, res) => {
    res
    .render('auth/verify');
    const data = JSON.parse({nama: 'Jeje'});
    return data;
})

.post('/register', (req, res) => {
    const { username, password } = req.body;
    // const cookie = req.cookies;
    const cookie_data = {
        username: username,
        password: password
    };
    res
    .cookie('register_acc_cookie', cookie_data, {
        expires: new Date(Date.now() + 15 * 1000)
    })
    // console.log(username, password);
    .redirect('/register');
})

.get('/login', (req, res) => {
    res
    .render('auth/login.ejs')
})

.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie('username', username);
    res.redirect('/home');
})

.get('/home', (req, res) => {
    const cookies = req.cookies;
    const data = {
        username: cookies['username']
    }
    res.render('home/index', { data });
})

.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/login');
})

.get('/cookie', (req, res) => {
    const {username, password} = req.cookies['register_acc_cookie'];
    const data = {
        username: username,
        password: password
    };
    res.render('cookie-check',{data})
})

module.exports = router;