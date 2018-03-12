const Rx = require('rxjs/Rx');

const coreStreamSocketPort = 8000;
const io = require('socket.io')(coreStreamSocketPort);

const openSocket = require('socket.io-client');
const newsAPISocket = openSocket('http://localhost:8001');

// TODO - treat differnetly than global article stream variable
let coreArticles$ = new Rx.BehaviorSubject(null);

// This namespace is used to deal with UI 
const clientSocketSubscription = io
    .of('/client')
    .on('connection', (client) => {

        let filterParameters$ = new Rx.BehaviorSubject(null);

        coreArticles$
            .filter(coreArticles => coreArticles)
            .subscribe(newCoreArticles => {
                // Sending the articles back up to the UI
                client.emit('newsStreamUpdated', newCoreArticles);
            });

        client.on('startNewsStream', () => {
            // Here we start trigger all sub services to start polling their APIs
            newsAPISocket.emit('startPollingNewsAPI');
            // TODO - Add other API polling services to start here (Twitter, EventNews)
        });

        client.on('updateNewsStreamFilterParameters', (filterParameters) => {
            filterParameters$.next(filterParameters);

            // We emit to the NewsAPI via WS the new updated filter parameters for it's API
            newsAPISocket.emit('updateNewsAPIFilterParameters', filterParameters$.value);
            // TODO - Add other API filters to send to here (Twitter, EventNews)
        });

        client.on('endNewsStream', () => {
            // TODO - stop sub processus from polling?  
        });

    });

const newsAPISocketSubscription = io
    .of('/newsapi')
    .on('connection',
    (client) => {
        // We will be receiving these from multiple API processus that are constantly polling
        client.on('newsStreamUpdated', (newArticles) => {
            //Listening to updated articles from the NewsAPI service
            coreArticles$.next(newArticles);
        });
    });