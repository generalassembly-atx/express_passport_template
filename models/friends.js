var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
  userID1: { type: Schema.Types.ObjectId, ref: 'User' },
  userID2: { type: Schema.Types.ObjectId, ref: 'User' }
});

// friendSchema.methods.findFriend = function(userId, cb) {



var Friend = mongoose.model('Friend', friendSchema);
module.exports = mongoose.model('friends', friendSchema);
