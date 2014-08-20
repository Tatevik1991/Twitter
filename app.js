var express = require('express');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');

mongoose.connect('mongodb://localhost/mydb');

var schema = mongoose.Schema({
	author: String,
	title: String,
	description: String,
	url: String
	});

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/', function(req, res, next){
		res.redirect('/request.html');
     
});
var FlickerModel = mongoose.model('api', schema);

app.get('/test', function(req, res, next){
  FlickerModel.find({ },  function(err, api){
            if (err) return console.error(err);
            //console.log(apis);
            res.render('test', {
            name: api[0].url

    });
          });
              
    
     
});

app.post('/request', function(req, res, next) {
     
 var body = '';
 req.on('data', function(data) {
  body += data;
  });

    req.on('end', function() {
        if (body !== '') {
         var store = JSON.parse(body);
         var flicker = new FlickerModel(store);

          //console.log(flicker.description);
          flicker.save(function(err, flicker){
            if(!err){
              console.log("Success!!!");
            }
          });
          
              
        }  else {
            res.statusCode = 403;
            res.end("Forbidden");
        }
    });
});

app.listen(3000, function(err){
	if(!err){
		console.log("OK!");
	}

});

