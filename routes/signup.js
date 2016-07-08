var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');

/* GET signup page */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'DateHub: Signup'});
});

/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'DateHub: Signup'});
});

/* CREATE USER */
router.post('/', function(req, res, next){

  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    image_url: req.body.image_url,
    catchphrase: req.body.catchphrase,
    location: req.body.location,
    aboutme: req.body.aboutme,
    age: req.body.age
  });

  newUser.save(function(err, user){
    if (err) console.log(err);
    res.redirect('login')
  })
});

module.exports = router;
