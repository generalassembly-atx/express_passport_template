var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  location: String,
  aboutme: String,
  age: Number
})

var Profile = mongoose.model('Profile', profileSchema);
module.exports = mongoose.model('profiles', profileSchema);
