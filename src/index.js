// Import section
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

// Loads .env file contents into process.env. Example: 'KEY=value'
// becomes { parsed: { KEY: 'value' } }
require('dotenv').config();

// Creates an Express application. The express() function is a top-level
// function exported by the express module.
const app = express();

// Sets up all routes to allows Express use json as request body
app.use(express.json());

// Allows app use the routes defined at the routes file
app.use(routes);


// Mongoose Connection
// Module used to config a connection with a external MongoDB Database, in this
// case one in MongoDB Atlas. The first argument is the DB_token, token that
// identify your external DB and the other two are just some configuration to
// avoid some warnings. See that I am using Dotenv to hide my DB_TOKEN, that is
// essential to keep your data safe. Always set yours environment variables with
// Dotenv
mongoose.connect(process.env.DB_TOKEN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Make app listen a certain port, in this case 3333
app.listen(3333);
