var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');

var User = require('../models/user');

/* GET home page. */
router.get('/', authWall, function(req, res, next) {
  res.send("Welcome back, " + req.user.email);
});

/* POST signup form */
router.post('/', function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err, user) {
    // Handle save error
    if (err) return next(err);
    res.redirect('/users/new');
  });
});

router.get('/frequest/:id', function(req, res, next) {
  res.redirect('/everyone')
});

/* POST friend request ??????????*/
router.post('/frequest/:id', function(req, res, next) {
  var newFriend = new Friend({
    userID1: req.params.id,
    userID2: req.session._id
  });
});
module.exports = router;
