var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');
var Friend = require('../models/friends')

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
    // console.log(users);
    res.render('everyone', { title: 'DateHub Main', users: users})
  });
});

/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'DateHub: Signup'});
});

/* GET main profile page */
router.get('/profile', function(req, res, next) {
  // console.log(req.session);
  res.render('profile', { title: 'DateHub: Profile'});
});

/* GET another user's profile page */
router.get('/profile/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(id);
  User.findById(id, function(err, user) {
    // console.log(user);
    res.render('profile', { title: 'DateHub: Profile', user:user});
  })
});

router.get('/frequest/:id', function(req, res, next) {
  res.redirect('/everyone')
});

/* POST friend request ??????????*/
router.post('/frequest/:id', function(req, res, next) {
  var newFriend = new Friend({
    userID1: req.params.id,
    userID2: req.session.currentUser.id
  });
console.log()
  newFriend.save(function(err, user){
    if (err) console.log(err);
    res.redirect('everyone');
  });
});

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
    image_url: req.body.image_url,
    location: req.body.location,
    aboutme: req.body.aboutme,
    age: req.body.age
  });

  newUser.save(function(err, user){
    if (err) console.log(err);
    res.redirect('login')
  });
});


module.exports = router;
