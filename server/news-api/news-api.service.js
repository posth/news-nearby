const express = require('express');
const router = express.Router();

// News API
const NewsAPI = require('newsapi');
const { NEWS_API_KEY } = require('./news-api.config');;

const newsapi = new NewsAPI(NEWS_API_KEY);

router.get('/', (req, res, next) => {
    newsapi.v2.topHeadlines({
        country: 'ca'
    }).then(response => {
        res.send(response);
    })
});

module.exports = router;