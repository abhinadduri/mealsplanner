var express = require('express')
var app = express()
const MongoClient = require('mongodb').MongoClient

var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

var db;

MongoClient.connect('mongodb://users:supernice@ds117199.mlab.com:17199/meal-planner-users', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8000, () => {
    console.log('listening on 3000')
  })
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/login', function(req, res) {
  db.collection('users').find({username: req.body.username}).toArray((err, result) => {
    console.log('logging in');
    if (err) 
      res.send(err);
    else if (result.length === 0)
      res.send('failed');
    else {
      var user = result[0];
      if (user.password === req.body.password) {
        res.send(result[0])
      }
      else
        res.send('failed');
    }
  });
});

app.post('/signup', function(req, res) {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.send('success');
  })
});


app.post('/addIngredient', function(req, res) {
  db.collection('users').find({username: req.body.username}).toArray((err, result) => {
console.log('sup');
    if (err)
      res.send(err);
    else if (result.length === 0)
      res.send('failed');
    else {
      var user = result[0];
      if (user.password === req.body.password) {
console.log('here');
	db.collection('users').update({username: req.body.username}, {$set: {ingredients: JSON.parse(req.body.ingredients)}}, function(err) {
		console.log('error');
})
      }
      else
        res.send('failed');
    }
  });
});

