//******** MODULES AND MIDDLEWARE ********//
var express = require('express');
var app = express();

require('dotenv').config();
app.set('view engine', 'ejs');

var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/expressApp'
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

app.use(express.static('./public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var loadUser = require('./middleware/loadUser');
app.use(loadUser);

//******** ROUTES ********//

var userRouter = require('./routes/users');
app.use('/users', userRouter);

var postingsRouter = require('./routes/postings');
app.use('/postings', postingsRouter);

app.get('/', function(req, res){
  res.render('index');
});

app.get('/googlec908cbbe1d66732f.html', function(req,res){
  res.render('googlec908cbbe1d66732f');
})

//******** LISTENING @ ********//

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port '+ port);
});

//
