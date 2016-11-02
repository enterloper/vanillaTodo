"use strict";
let express    = require('express');
let bodyParser = require('body-parser');
let mongoose	 = require('mongoose');
let morgan     = require('morgan');
let app        = express();
let router     = express.Router();
let API        = require('./routes/APIRouter');

//mongodb connection
mongoose.connect("mongodb://localhost:27018/notebook");
// variable for the above connection using the connection property on the mongoose object
let db = mongoose.connection;
//error handling for mongodb
db.on('error', console.error.bind(console, 'connection error:'));

//MIDDLEWARE
//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//print out requests
app.use(morgan('dev',{
  // only log error responses
  // skip: function (req, res) { return res.statusCode < 400; }
}));

// SERVE UP THOSE DELICIOUS STATIC FILES!
app.use( express.static(__dirname + '/../client') );

app.get('/', (req,res) =>   {
  res.send('Hello Yoda!')
});

//ROUTERS
app.use("/api", API);

//ESTABLISH SERVER AND START SERVER
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), () => { console.log(`"To Do" app is running on port: ${app.get('port')}`)});