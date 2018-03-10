const Rx = require('rxjs/Rx');
const io = require('socket.io')();
const newsAPISocketPort = 8000;
const { getArticlesNewsAPI } = require('./news-api.service');

io.on('connection', (client) => {

    // An Observable stream of location and articles values we can subscribe to and update within the scope of this websocket
    let location$ = new Rx.BehaviorSubject(null);
    let articles$ = new Rx.BehaviorSubject(null);

    // Subscribing to any change in the Subject stream of articles, if there is a change, we emit it back to the client
    articles$.subscribe(newArticlesToEmit => client.emit('newsAPI', newArticlesToEmit));

    // Whenever the client updates the location, we update the value in our local Subject stream
    client.on('updateNewsAPIArticlesLocation', (newLocation) => {

        // The new location we get from the client we update it's Subject stream
        location$.next(newLocation);

        // Make an API call and update the articles Subject stream when the API promise is resolved
        Rx.Observable.fromPromise(getArticlesNewsAPI(location$.value))
            .subscribe(newArticles => articles$.next(newArticles));
    });

    // The event that is used to start polling the NewsAPI for articles
    client.on('startPollingNewsAPI', () => {
        // Creating an Observable that at an interval of 1min, polls an API call
        Rx.Observable.interval(6000)
            .switchMap(() =>
                //We create an Observable on a Promise that has itself been converted to an Observable
                //which emits a value each time it resolves an API call value
                Rx.Observable.fromPromise(getArticlesNewsAPI(location$.value))
            )
            .subscribe(newArticles => articles$.next(newArticles))
    });
});

io.listen(newsAPISocketPort);
