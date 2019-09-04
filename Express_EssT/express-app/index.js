import express from 'express';
import favicon from 'serve-favicon';     //check whether better import package from 'package' syntax is better than const package = require('package')
import path from 'path';
import data from './data/data.json';

const app = express();
const PORT = 3000;

//this is for the public folder on '/' path 
app.use(express.static('public'));

//this is for images folder on path images
app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
    res.json(data);
});

//method to use json
// app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/item/:id', (req, res, next) => {
    //this is the middleware that pulls the data
    let user = Number(req.params.id);           //params from request will be a string. need to convert to a number. 
    //middleware that uses the req object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    //above code is middleware
    res.send(data[user]);
    next();
}, (req, res) => 
    console.log('Did you get the right data?')
);

app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.route('/item')
    .get((req, res) => {
        throw new Error();
        //res.download('images/rocket.jpg');              //downloads the file to the client
        //res.redirect('http://www.linkedin.com');      //redirecting to another page
        //res.end()                                     //ends the call 
        res.send(`a get request with /item route on port ${PORT}`)
    })
    .put((req, res) => {
        res.send(`a put request with /item route on port ${PORT}`)
    })
    .delete((req, res) => {
        res.send(`a delete request with /item route on port ${PORT}`)
    });

// Error handling function
app.use((err, req, res, next) => {
    console.err(err.stack);
    res.status(500).send(`Red alert! Red alert!: ${err.stack}`)
})

// usually the last thing in your index.js file
app.listen(PORT, () => {
    console.log(`Your server is running on ${PORT}`);   
});