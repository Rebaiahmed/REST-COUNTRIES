var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('Main.html',{"root": '/home/ahmed/Mean_Stack_projects/Rest_Countries/public'})
});

module.exports = router;
