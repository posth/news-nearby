import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToNewsAPI(callback) {
    // Client subscribing to socket event from server
    socket.on('newsAPI', newsAPIArticles => callback(newsAPIArticles));
}

function fetchNewsAPIArticles(newLocation) {
    socket.emit('fetchNewsAPIArticles', newLocation);
}

export {
    subscribeToNewsAPI,
    fetchNewsAPIArticles
};