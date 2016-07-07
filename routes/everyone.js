var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');

/* GET main portal */
router.get('/', authWall, function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) console.log(err);
    // console.log(users);
    res.render('everyone', { title: 'DateHub: Main', users: users})
  });
});

module.exports = router;
