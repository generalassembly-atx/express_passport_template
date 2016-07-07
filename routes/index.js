var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');
var Friend = require('../models/friend');

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
    // console.log(users);
    res.render('everyone', { title: 'DateHub Main', users: users})
  });
});

/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'DateHub: Signup'});
});

// UPDATE main profile page
router.patch('/:id', function(req, res, next){
  // redirect to show changes
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    if (err) console.log(err);
    res.redirect('/profile/' + req.params.id);
  });
});

router.get('/frequest/:id', function(req, res, next) {
  res.redirect('/everyone')
});

/* POST friend request ??????????*/
router.post('/frequest/:id', function(req, res, next) {
  var newFriend = new Friend({
    userID1: req.params.id,
    userID2: req.session.currentUserID
  });
  newFriend.save(function(err, user){
    if (err) console.log(err);
    res.redirect('everyone');
  });

});

module.exports = router;
