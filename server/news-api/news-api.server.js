const express = require('express');
const newsApp = express();

const io = require('socket.io')();
const newsAPISocketPort = 8000;

const { getArticlesNewsAPI } = require('./news-api.service');

newsApp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// newsApp.use('/newsAPI', newsApiService);

newsApp.listen(4000, () => {
    console.log('App listening on port 4000');
});

io.on('connection', (client) => {

    // Listening to event received from the client
    client.on('subscribeToNewsAPI', (location) => {
        // Client is listening to 'newsAPI' event and treating this emission's content wrapped around a Promise for sync API call 
        getArticlesNewsAPI(location)
            .then(
                articles => client.emit('newsAPI', articles),
                error => client.emit('newsAPI', `Loading articles from News API for ${location}`)
            )
            .catch(err => {
                console.error(`News API promise error on socket api call`);
            });
    });
});

io.listen(newsAPISocketPort);
