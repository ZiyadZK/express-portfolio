const express = require('express');
const routes = require('./route');
const ejs = require('ejs')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const path = require('path');
const { nanoid } = require('nanoid');

// const hbs = require('hbs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, _ => {
    console.log('App deployed at Port: ', port)
});

