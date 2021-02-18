const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import routes
const secretRoute = require('./routes/Secret');
app.use('/api/secret', secretRoute);

//Serving the builded Vue.js files
app.use(express.static(__dirname + '/public/'));

module.exports = app;