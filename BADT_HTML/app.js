//Initialize modules
var express = require("express");
var handlebars = require("express-handlebars").create({ defaultLayout: 'main' });
var path = require("path");
const app = express();

// app.use(express.static(path.join(__dirname, 'public')));


//Configures 'hbs' as the container for '.hbs' extension 
//app.engine('hbs', exphbs({ extname: '.hbs' }))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
//app.use(express.static(path.join(__dirname + '/public')));
app.set('port', 3000);              // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(__dirname + '/Customers.html');      // This function literally sends the string "The server is running!" to the computer
    });                                         // requesting the web site.

app.get('/Dogs', function(req, res)                
{
    res.sendFile(__dirname + '/Dogs.html');      
});       

app.get('/', function(req, res)                
{
    res.sendFile(__dirname + '/Customers.html');      
}); 

app.get('/', function(req, res)                
{
    res.sendFile(__dirname + '/Customers.html');      
}); 

app.get('/', function(req, res)                
{
    res.sendFile(__dirname + '/Customers.html');      
}); 

app.get('/', function(req, res)                
{
    res.sendFile(__dirname + '/Customers.html');      
}); 

app.get('/', function(req, res)                
{
    res.sendFile(__dirname + '/Customers.html');      
}); 
/*
    LISTENER
*/
app.listen(app.get("port"), function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`)
});