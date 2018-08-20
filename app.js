const express   = require('express');
const path      = require('path');
const mongoose  = require('mongoose');
const axios     = require('axios');
const https     = require('https');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
})

db.on('error', (err) => {
    console.log(err);
});


// Init app
const app = express();

// Bring in models
let Article = require('./models/article');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
});

app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    })
});

// Reading OMDB Api
app.get('/todos', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
        .then( todos => {
            res.render('todos', {
                title: 'Todo list',
                todos: todos
            });
        })
        .catch(error => {
            console.log(error);
        });

    https.get('https://jsonplaceholder.typicode.com/todos/1', (resp) => {
        console.log(resp);
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
