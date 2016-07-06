var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');
var Profile =require('../models/profile')

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
  // console.log(req.session);
  res.render('profile', { title: 'DateHub: Profile', firstname: req.session.currentUserFN, image_url: req.session.currentUserPic});
});

/* GET another user's profile page */
router.get('/profile/:id', function(req, res, next) {
  // var id = req.params.id;
  User.findById(req.params.id, function(err, user) {
    // console.log(user);
    res.render('profile', { title: 'DateHub: Profile', firstname: user.firstname, image_url: user.image_url});
  })
});

/* GET profile info */
router.get('/profileinfo', function(req, res, next) {
  console.log(req.session);
  res.render('profileinfo', { title: 'DateHub: Profile', firstname: req.session.currentUserFN, image_url: req.session.currentUserPic});
});

/* POST friend request */
router.post('/frequest/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    req.session.currentUserFriends.push(user.id);
    console.log(req.session.currentUserFriends);
    res.render('profile', { title: 'DateHub: Profile', firstname: user.firstname, image_url: user.image_url});
  })
})
/* LOG OUT */
router.get('/logout', function(req, res){
  req.session.destroy(function(){
  });
  res.render('login', {title: 'DateHub: Login'})
});

/* LOG IN */
router.post('/login', function(req, res, next) {
  User.findOne({ email: req.body.email }).exec(function(err, user) {
   user.comparePassword(req.body.password, function(err, isMatch) {
     if (isMatch) {
       req.session.currentUserID = user.id;
       req.session.currentUserFN = user.firstname;
       req.session.currentUserPic = user.image_url;
       req.session.currentUserFriends = user.friends;
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
router.post('/profile', function(req, res, next){

  var newProfile = new Profile({
    location: req.body.location,
    aboutme: req.body.aboutme,
    age: req.body.age
  });

  newProfile.save(function(err, profile){
    if (err) console.log(err);
    res.render('testprofile', {title: 'something goes here'})
  })
});


module.exports = router;
