/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Ryan Ho
 * Email: hor@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var tData = require('./twitData');
console.log(tData);

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: null}));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

app.get('/', function (req, res) {
  //res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
  res.status(200).render('tweeterPage', {
    twitData: tData
  });
});

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
