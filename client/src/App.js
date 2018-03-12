import React, { Component } from 'react';
import './App.css';

// Components
import NewsAPIArticle from './components/news-api-article.component';

import {
  onNewsStreamUpdated,
  startNewsStream,
  updateNewsStreamFilterParameters
} from './services/core-stream.client.js';

class App extends Component {

  constructor() {
    super();

    this.state = {
      location: 'ca',
      newsArticles: null
    };

    onNewsStreamUpdated((newsArticles) => {
      this.setState({
        newsArticles
      });
    });

    updateNewsStreamFilterParameters(this.state.location);
  }

  componentDidMount() {
    startNewsStream();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Nearby News!</h1>
        </header>
        <article>
          <h4>NewsAPI search location (ca, fr, us)</h4>
          <input onChange={event => {
            this.setState({
              location: event.target.value
            })
          }} type="text" />
          <button onClick={() => {
            updateNewsStreamFilterParameters(this.state.location);
          }}>Change location of articles</button>
        </article>
        {this.state.newsArticles !== null &&
          <section>
            <h2>News Articles</h2>
            <article>
              {
                this.state.newsArticles["articles"]
                  .map((article, index) => <NewsAPIArticle article={article} key={index} />)
              }
            </article>
          </section>}
      </div>
    );
  }
}

export default App;
