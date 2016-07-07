var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');

/* LOG IN */
router.post('/', function(req, res, next) {
  User.findOne({ email: req.body.email }).exec(function(err, user) {
   user.comparePassword(req.body.password, function(err, isMatch) {
     if (isMatch) {
       req.session.currentUserID = user.id;
       console.log(req.session);
       console.log('is match', isMatch);
       res.redirect('everyone');
     }
     else {
       res.send('YOU ARE WRONG');
     }
   });
 });
})

/* GET login page */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'DateHub: Login'});
});








module.exports = router;
