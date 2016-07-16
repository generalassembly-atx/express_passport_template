var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
  userID1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userID2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

friendSchema.pre('save', function(next) {
    if (this.userID1.equals(this.userID2)) {
        next(Error('YOU CANT'));
    } else {
        next();
    }
});

friendSchema.index({userID1: 1, userID2: 1}, {unique: true});
friendSchema.index({userID2: 1, userID1: 1}, {unique: true});
module.exports = mongoose.model('friends', friendSchema);
