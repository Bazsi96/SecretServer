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

// For heroku deployment
if(process.env.NODE_ENV.trim() == "production") {
   console.log("HALOHALO")
   app.use(express.static('../client/dist'));
}

module.exports = app;