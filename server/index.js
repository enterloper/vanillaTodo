"use strict";
let express = require('express');
let bodyparser = require('body-parser');
let morgan = require('morgan')
let app = express();
let router = express.Router();

app.get('/', function(req,res) {
  res.send('Hello Yoda!')
});


app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), () => { console.log(`"To Do" app is running on port: ${app.get('port')}`)});