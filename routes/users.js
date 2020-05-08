var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var name = req.body.name;
  console.log(name);
  res.send('respond with a resource '+name);
});

module.exports = router;