var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DateHub' });
});
/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'DateHub: Login'});
});

/* GET main portal */
router.get('/everyone', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) console.log(err);
    console.log(users);
    res.render('everyone', { title: 'DateHub: Main', users: users})
  });
});

/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'DateHub: Signup'});
});

/* GET main profile page */
router.get('/profile', function(req, res, next) {
  console.log(req.session);
  res.render('profile', { title: 'DateHub: Profile', firstname: req.session.currentUserFN, image_url: req.session.currentUserPic});
});

router.get('/profileinfo', function(req, res, next) {
  console.log(req.session);
  res.render('profileinfo', { title: 'DateHub: Profile', firstname: req.session.currentUserFN, image_url: req.session.currentUserPic});
});

router.get('/logout', authWall, function(req, res){
  req.session.destroy(function(){
  });
});
/* LOG IN */
router.post('/login', function(req, res, next) {
  User.findOne({ email: req.body.email }).exec(function(err, user) {
   user.comparePassword(req.body.password, function(err, isMatch) {
     if (isMatch) {
       req.session.currentUserID = user.id;
       req.session.currentUserFN = user.firstname;
       req.session.currentUserPic = user.image_url;
       console.log(req.session);
       console.log('is match', isMatch);
       res.redirect('profile');
     }
     else {
       res.send('YOU ARE WRONG');
     }
   });
 });
})

/* CREATE USER */
router.post('/signup', function(req, res, next){

  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    image_url: req.body.image_url
  });

  newUser.save(function(err, user){
    if (err) console.log(err);
    res.redirect('login')
  })
});

/* CREATE PROFILE WITHIN USER */



module.exports = router;
