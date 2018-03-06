import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToNewsAPI(callback, location) {
    // Client subscribing to socket event from server
    socket.on('newsAPI', newsAPIArticles => callback(newsAPIArticles));
    socket.emit('subscribeToNewsAPI', location);
}

export { subscribeToNewsAPI };