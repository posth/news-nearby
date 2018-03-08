// Websocket based microservice connected to client
// Data within the microservice is synchronous but protocol client-server is async (websocket)
const io = require('socket.io')();
const newsAPISocketPort = 8000;
const { getArticlesNewsAPI } = require('./news-api.service');

io.on('connection', (client) => {
    // Listening to event received from the client
    client.on('fetchNewsAPIArticles', (location) => {
        // Client is listening to 'newsAPI' event and treating this emission's content wrapped around a Promise for sync API call 
        getArticlesNewsAPI(location)
            .then(
                articles => client.emit('newsAPI', articles),
                error => client.emit('newsAPI', `No articles from NewsAPI found from ${location}, please try another location`)
            )
            .catch(err => {
                console.error(`News API promise error on socket api call`);
            });
    });
});

io.listen(newsAPISocketPort);
