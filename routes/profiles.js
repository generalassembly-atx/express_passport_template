var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');
var mongoose = require('mongoose');
var Friend = require('../models/friend');

/* GET another user's profile page */
router.get('/:id', authWall, function(req, res, next) {
  var id = req.params.id;
  // console.log(id);
  User.findById(id, function(err, user) {
    // console.log(user);
    user.findFriends(function(err, friends) {
      console.log(friends);
      res.render('profile', { title: 'DateHub: Profile', friends: friends, profileUser: user });
    })
  })

});

/* GET main profile page */
// router.get('/', function(req, res, next) {
//   // console.log(req.session);
//   res.render('profile', { title: 'DateHub: Profile', friends: friends});
// });

module.exports = router;
