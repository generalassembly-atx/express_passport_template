var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
  userID1:  String,
  userID2: String
});


var Friend = mongoose.model('Friend', friendSchema);
module.exports = mongoose.model('friends', friendSchema);
