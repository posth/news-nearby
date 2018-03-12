const Rx = require('rxjs/Rx');

// NewsAPI Websocket
const newsAPISocketPort = 8001;
const io = require('socket.io')(newsAPISocketPort);

// Socket connection to core stream
const openSocket = require('socket.io-client');
const coreSocket = openSocket('http://localhost:8000/newsapi');

const { getArticlesNewsAPI } = require('./news-api.service');

// NewsAPI Websocket behavior
io.on('connection', (client) => {

    // An Observable stream of location and articles values we can subscribe to and update within the scope of this websocket
    let location$ = new Rx.BehaviorSubject(null);
    let articles$ = new Rx.BehaviorSubject(null);

    // Subscribing to any change in the Subject stream of articles, if there is a change, we emit it back to the client
    articles$
        .filter(newArticlesReceived => newArticlesReceived)
        .subscribe(newArticlesToEmit => {
            coreSocket.emit('newsStreamUpdated', newArticlesToEmit);
        });

    // Whenever the client updates the location, we update the value in our local Subject stream
    client.on('updateNewsAPIFilterParameters', (filterParameters) => {

        // TODO - for now filterParameters = 'ca' straight from the UI 

        // The new location we get from the client we update it's Subject stream
        location$.next(filterParameters);

        // Make an API call and update the articles Subject stream when the API promise is resolved
        Rx.Observable.fromPromise(getArticlesNewsAPI(location$.value))
            .subscribe(newArticles => articles$.next(newArticles));
    });

    // The event that is used to start polling the NewsAPI for articles
    client.on('startPollingNewsAPI', () => {
        // Creating an Observable that at an interval of 1min, polls an API call
        Rx.Observable.interval(60000)
            .switchMap(() =>
                //We create an Observable on a Promise that has itself been converted to an Observable
                //which emits a value each time it resolves an API call value
                Rx.Observable.fromPromise(getArticlesNewsAPI(location$.value))
            )
            .subscribe(newArticles => {
                articles$.next(newArticles);
            })
    });
});
