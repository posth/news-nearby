const express = require('express');
const app = express();

const newsApiService = require('./news-api.service');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use('/newsAPI', newsApiService);

app.listen(4000, () => {
    console.log('App listening on port 4000');
});