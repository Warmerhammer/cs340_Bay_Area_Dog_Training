//Initialize modules
var express = require("express");
// var handlebars = require("express-handlebars").create({ defaultLayout: 'main' });
var path = require("path");
const app = express();
// const router = express.Router();
app.use(express.urlencoded());

// app.use(express.static(path.join(__dirname, 'public')));


//Configures 'hbs' as the container for '.hbs' extension 
//app.engine('hbs', exphbs({ extname: '.hbs' }))
// app.engine('handlebars', handlebars.engine)
// app.set('view engine', 'handlebars')
//app.use(express.static(path.join(__dirname + '/public')));
app.set('port', 3000);              // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Index.html'));      
}); 

app.get('/Customers', function(req, res) {
    res.sendFile(path.join(__dirname + '/Customers.html'));      
});                                         

app.get('/Dogs', function(req, res) {
    res.sendFile(path.join(__dirname + '/Dogs.html'));      
});       

app.get('/Dog_has_Training_Session', function(req, res) {
    res.sendFile(path.join(__dirname + '/Dog_has_Training_Session.html'));      
}); 

app.get('/Packages', function(req, res) {
    res.sendFile(path.join(__dirname + '/Packages.html'));      
}); 

app.get('/Purchases', function(req, res) {
    res.sendFile(path.join(__dirname + '/Purchases.html'));      
}); 

app.get('/Session_Types', function(req, res) {
    res.sendFile(path.join(__dirname + '/Session_Types.html'));      
}); 

app.get('/Trainers', function(req, res) {
    res.sendFile(path.join(__dirname + '/Trainers.html'));      
}); 

app.get('/Trainer_has_Training_Session', function(req, res) {
    res.sendFile(path.join(__dirname + '/Trainer_has_Training_Session.html'));      
}); 

app.get('/Training_Sessions', function(req, res) {
    res.sendFile(path.join(__dirname + '/Training_Sessions.html'));      
}); 
/*
    LISTENER
*/
app.listen(app.get("port"), function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`)
});