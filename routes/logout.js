var express = require('express');
var router = express.Router();
var authWall = require('../lib/auth_wall');
var User = require('../models/user');

/* LOG OUT */
router.get('/', function(req, res){
  req.session.destroy(function(){
  });
  res.render('index', {title: 'DateHub'})
});


module.exports = router;
