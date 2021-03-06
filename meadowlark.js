var express = require ('express');
var fortune = require ('./lib/fortune.js');

//=========================================================

var app = express ();
app.set ('port', process.env.PORT || 3000);

// using a public dir for static files
app.use(express.static(__dirname + '/public'));

app.get ('/', function(req, res) {
    res.render ('home');
});
app.get ('/about', function(req, res) {
    res.render ('about', { fortune: getFortune() });
});

// пользовательская страница 404
app.use (function(req, res, next) {
    res.status (404);
    res.render ('404');
});
// пользовательская страница 500
app.use (function (err, req, res, next) {
    console.error (err.stack);
    res.status (500);
    res.render ('500');
});
app.listen (app.get ('port'), function() {
    console.log ( 'Express запущен на http://localhost:' +
    app.get ('port') + '; нажмите Ctrl+C для завершения.');
});

// Установка механизма представления handlebars
var handlebars = require ('express-handlebars')
.create ( { defaultLayout:'main' } );
app.engine ('handlebars', handlebars.engine);
app.set ('view engine', 'handlebars');


