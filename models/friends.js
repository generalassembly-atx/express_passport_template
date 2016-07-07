var mongoose = require('mongoose');
var User = require('../models/user');

var friendSchema = new mongoose.Schema({
  userID1:  String,
  userID2: String
});

// Friend.find({}, function (err, friends) {
//   if (err) console.log(err);
//   console.log(friends);
//     // res.render('edit', {title: 'DateHub: Edit', friends: friends})
//   });

friendSchema.methods.findFriends = function(id, cb) {
  Friend.findById(this.userID1, function(err, user1) {
    Friend.findById(this.userID2, function(err, user2) {
    console.log([user1, user2]);
    });
  });
};


var Friend = mongoose.model('Friend', friendSchema);
module.exports = mongoose.model('friends', friendSchema);
