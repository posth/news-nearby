import openSocket from 'socket.io-client';

const coreSocket = openSocket('http://localhost:8000/client');

// Listeners
function onNewsStreamUpdated(callback) {
    coreSocket.on('newsStreamUpdated', newsArticles => callback(newsArticles));
}

// Emitters
function startNewsStream() {
    coreSocket.emit('startNewsStream');
}

function updateNewsStreamFilterParameters(filterParameters) {
    coreSocket.emit('updateNewsStreamFilterParameters', filterParameters);
}

function endNewsStream() {
    coreSocket.emit('endNewsStream');
}

export {
    onNewsStreamUpdated,
    startNewsStream,
    updateNewsStreamFilterParameters,
    endNewsStream
};