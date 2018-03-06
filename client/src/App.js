import React, { Component } from 'react';
import './App.css';

import { subscribeToNewsAPI } from './services/news-api.client';

class App extends Component {

  constructor() {
    super();
    this.state = {
      location: 'ca',
      newsAPIArticles: 'No articles from News API'
    };

    // Subscribing to news API
    subscribeToNewsAPI((newsAPIArticles) => this.setState({
      newsAPIArticles
    }), this.state.location);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Nearby News!</h1>
        </header>
        <section>
          Articles received are: {JSON.stringify(this.state.newsAPIArticles)}
        </section>
      </div>
    );
  }
}

export default App;
