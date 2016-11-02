var express    = require('express');
var APIRouter  = express.Router();
var Promise    = require('bluebird');


/***************** API HEADER CHECK *****************/

APIRouter.get('/', function(req, res) {
  res.set('Content-Type', 'application/json');
  var s = '';
  req.secure;
  for(var name in req.headers) {s += name + ': ' + req.headers[name] + '\n';}
  res.send(s);
});

module.exports = APIRouter;