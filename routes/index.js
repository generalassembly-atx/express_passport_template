var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DateHub' });
});
/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'DateHub: Login'});
});

/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'DateHub: Signup'});
});

/* CREATE USER */
router.post('/signup', function(req, res, next){
  // redirect to index
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    image_url: req.body.image_url,
    profile_id: Number
  });

  newUser.save(function(err, recipe){
    if (err) console.log(err);
    res.redirect('login')
  })
});


module.exports = router;
