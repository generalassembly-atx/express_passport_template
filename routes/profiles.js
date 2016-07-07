var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
/* GET another user's profile page */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  // console.log(id);
  User.findById(id, function(err, user) {
    // console.log(user);
    res.render('profile', { title: 'DateHub: Profile', user:user});
  })
});

/* GET main profile page */
router.get('/', function(req, res, next) {
  // console.log(req.session);
  res.render('profile', { title: 'DateHub: Profile'});
});

module.exports = router;
