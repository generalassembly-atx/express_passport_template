var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DateHub' });
});

// EDIT main profile page
router.get('/:id/edit', function(req, res, next){
  // get edit user form
  var id = req.params.id;
  User.findOne({_id: id }, function(err, user){
    if (err) console.log(err);
    res.render('edit', {user: user})
  })
});

// UPDATE main profile page
router.patch('/:id', function(req, res, next){
  // redirect to show changes
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    if (err) console.log(err);
    res.redirect('/profile/' + req.params.id);
  })
});

/* POST friend request */
router.post('/frequest/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    req.session.currentUserFriends.push(user.id);
    console.log(req.session.currentUserFriends);
    res.redirect('/profile')
  })
})


module.exports = router;
