var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
  created_at: {type: Date, required: true, default: Date.now},
  firstname1: type: String,
  firstname2: type: String,
  userID1: type: String,
  userID2: type: String


});

// friendSchema.methods.friendsName = function(candidatePassword, cb) {
//   bcryptjs.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

var Friend = mongoose.model('Friend', profileSchema);
module.exports = mongoose.model('friend', profileSchema);
