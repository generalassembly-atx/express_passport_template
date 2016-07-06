var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  location: String,
  aboutme: String,
  age: Number
})

var Profile = mongoose.model('Profile', profileSchema);
mongoose.model('profiles', profileSchema);
