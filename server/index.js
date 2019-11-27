const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error. Por favor intente nuevamente');
});

require('./routes/api/dataSet')(app);

app.use(express.static('./public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);