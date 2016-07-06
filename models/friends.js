var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
  created_at: {type: Date, required: true, default: Date.now},

})

var Profile = mongoose.model('Profile', profileSchema);
module.exports = mongoose.model('profiles', profileSchema);
