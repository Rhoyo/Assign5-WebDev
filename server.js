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

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

var hbs = exphbs.create({});

// register new function
hbs.handlebars.registerHelper('ifModal', function(v1, options) {
  if(v1 > 1) {
    return options.fn(this);
  }
  return options.inverse(this);
});


app.get('/', function (req, res) {
  //res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
  res.status(200).render('tweeterPage', {
    twitData: tData
  });
});

app.get('/:n', function (req, res, next) {
  var num = req.params.n;
  if(num == '0'||num == '1'||num == '2'||num == '3'||num == '4'||num == '5'||num == '6'||num == '7'){
    res.status(200).render('tweeterPage', {
      twitData: [tData[num]]
    });
  }
else{
  next();
}
});

app.get('*', function (req, res) {
  //res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  res.status(200).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
