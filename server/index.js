const express = require('express');
const bodyParser = require('body-parser');

const beers = require("./beers.json");

const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:32768/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var beerSchema = new mongoose.Schema({
    name: String,
    price: Number,
    alcohol: Number
});

var Beer = mongoose.model('Beer', beerSchema);

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//On définit la route Hello
app.get('/api/beers',function(req, res) {
    if (req.query.name) {
        const regex = new RegExp(`^${req.query.name}` ,'g');
        Beer.find({ name: regex }, function (err, beers) {
            if (err) {
                res.status(500)
                res.send()
                return
            }
            console.log(beers);
            res.json(beers);
        })
        return
    }
    Beer.find(function (err, beers) {
        if (err) {
            res.status(500)
            res.send()
            return
        }
        console.log(beers);
        res.json(beers);
    })
})

app.get('/api/beers/:id',function(req, res) {
    Beer.find({ _id: req.params.id }, function (err, beers) {
        if (err) {
            res.status(500)
            res.send()
            return
        }
        console.log(beers);
        res.json(beers[0]);
    })
})

app.post('/api/beers', function(req, res){
    const beer = Beer(req.body)
    beer.save(function(err, item){
        if(err){
            res.status(500)
            res.send()
            return
        }
        res.status(201)
        res.send(item)
    })
})

app.put('/api/beers/:id', (req, res) => {
    Beer.update({ _id: req.params.id }, req.body, (err, item) => {
        if (err) {
            res.status(404);
            res.send();
        }
        res.json(item);
    });
})

//Définition et mise en place du port d'écoute
var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));