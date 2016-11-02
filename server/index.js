"use strict";
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan')
let app = express();
let router = express.Router();
let API = require('./routes/APIRouter');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev',{
  // only log error responses 
  // skip: function (req, res) { return res.statusCode < 400; }
}));

// SERVE UP THOSE DELICIOUS STATIC FILES!
app.use( express.static(__dirname + '/../public') );

app.get('/', function(req,res) {
  res.send('Hello Yoda!')
});

//ROUTERS
app.use("/api", API);

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), () => { console.log(`"To Do" app is running on port: ${app.get('port')}`)});