var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var Friend = require('./friend')

var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true },
  phone: { type: Number, required:true },
  image_url: {type: String, required:true },
  location: String,
  aboutme: String,
  age: Number
});

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcryptjs.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcryptjs.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcryptjs.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.findFriends = function(cb) {
  var self = this;
  Friend.find( { $or:[ {'userID1':this.id}, {'userID2':this.id} ]},
   function(err,docs){
     var friendIDs = docs.map(function(doc) {
       if(doc.userID1 === this.id) {
         return doc.userID2;
       }
       else { return doc.userID1; }
     })
     self.model('User').find({'_id': { $in:friendIDs }}, function(err, users) {
       cb(err, users);
     })
  });
};

var User = mongoose.model('User', userSchema);
module.exports = mongoose.model('users', userSchema);
