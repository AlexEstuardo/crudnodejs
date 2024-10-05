const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'vista')));

app.use('/api', require('./modulos/rutas'));

module.exports = app;
