const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import routes
const secretRoute = require('./routes/Secret');
app.use('/api/secret', secretRoute);

app.use(express.static(__dirname + '/public/'));

module.exports = app;