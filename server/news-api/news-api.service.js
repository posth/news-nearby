// News API
const NewsAPI = require('newsapi');
const { NEWS_API_KEY } = require('./news-api.config');;

const newsapi = new NewsAPI(NEWS_API_KEY);

// Returns a promise API call
function getArticlesNewsAPI(country) {
    return newsapi.v2.topHeadlines({
        country
    }).then(response => {
        return response;
    }).catch(err => {
        return Promise.reject(Error(`Error occured on newsapi.v2.topHeadlines with ${err}`));
    });
}

module.exports = {
    getArticlesNewsAPI
};