import React, { Component } from 'react';
import './App.css';

// Components
import NewsAPIArticle from './components/news-api-article.component';

import {
  subscribeToNewsAPI,
  fetchNewsAPIArticles
} from './services/news-api.client';

class App extends Component {

  constructor() {
    super();
    this.state = {
      location: 'ca',
      newsAPIArticles: null
    };

    // Subscribing to news API web socket
    subscribeToNewsAPI((newsAPIArticles) => this.setState({
      newsAPIArticles
    }));
  }

  componentDidMount() {
    fetchNewsAPIArticles(this.state.location);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Nearby News!</h1>
          <article>
            <input onChange={event => {
              this.setState({
                location: event.target.value
              })
            }} type="text" />
            <button onClick={() => {
              fetchNewsAPIArticles(this.state.location);
            }}>Change location of articles</button>
          </article>
        </header>
        {this.state.newsAPIArticles !== null && <section>
          <h2>News API Articles</h2>
          <article>
            {
              this.state.newsAPIArticles["articles"]
                .map((article, index) => <NewsAPIArticle article={article} key={index} />)
            }
          </article>
        </section>}
      </div>
    );
  }
}

export default App;
