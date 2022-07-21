//Initialize modules
var express = require("express");
var exphbs = require("express-handlebars").create({extname: 'hbs', defaultLayout: 'main'});
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, '/public')));

// HANDLEBARS setting -- shorten file extension to .hbs
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');


// LISTENER
const PORT = 3000;

// ROUTES

app.get('/', function(req, res) {
    res.render('Index');      
}); 

app.get('/Customers', function(req, res) {
    res.render('Customers');      
});                                         

app.get('/Dogs', function(req, res) {
    res.render('Dogs')
});       

app.get('/Dog_has_Training_Session', function(req, res) {
    res.render('Dog_has_Training_Session');      
});

app.get('/Packages', function(req, res) {
    res.render('Packages');      
}); 

app.get('/Purchases', function(req, res) {
    res.render('Purchases');      
}); 

app.get('/Session_Types', function(req, res) {
    res.render('Session_Types');      
}); 

app.get('/Trainers', function(req, res) {
    res.render('Trainers');      
});

app.get('/Trainer_has_Training_Session', function(req, res) {
    res.render('Trainer_has_Training_Session');      
}); 

app.get('/Training_Sessions', function(req, res) {
    res.render('Training_Sessions');      
}); 

app.listen(PORT, function(){            
    console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`)
});    