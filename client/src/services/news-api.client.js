import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToNewsAPI(callback) {
    // Client subscribing to socket event from server
    socket.on('newsAPI', newsAPIArticles => callback(newsAPIArticles));
}

function updateNewsAPIArticlesLocation(newLocation) {
    socket.emit('updateNewsAPIArticlesLocation', newLocation);
}

function startPollingNewsAPI() {
    socket.emit('startPollingNewsAPI');
}

export {
    subscribeToNewsAPI,
    updateNewsAPIArticlesLocation,
    startPollingNewsAPI
};