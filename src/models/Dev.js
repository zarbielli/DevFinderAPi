// We need to import mongoose here to setting up how this model will be save at
// MongoDB
const mongoose = require('mongoose');

// Function used to setting the Dev table columns scheme
const DevSchema = new mongoose.Schema({
  name: String,
  gitUser: String,
  bio: String,
  avatarUrl: String,
  // When you pass the type off a attribute inside a array, MongoDB knows that
  // this attribute will be a array of this type.
  techs: [String],
});

// After you create the Model Scheme you have to export the model to make it
// available for use. To this you will use the mongoose.model() function that
// needs to receive two arguments, the first is the table name, and the second
// is the table scheme.

module.exports = mongoose.model('Devs', DevSchema);
