var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  location: String,
  aboutme: String,
  age: Number,
  preference: String,
  post_id: Number
})

var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
