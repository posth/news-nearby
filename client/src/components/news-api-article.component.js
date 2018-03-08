import React from 'react';

const NewsAPIArticle = ({ article }) => (
    <article>
        <h4>{article.title}</h4>
        {/* <img src={article.urlToImage} /> */}
        <p>{article.description}</p>
        <p><a href={article.url}>Read more...</a></p>
    </article>
)

export default NewsAPIArticle;