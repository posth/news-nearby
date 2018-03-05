import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      newsapi: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/newsAPI')
      .then(result => result.json())
      .then(response => {
        console.log('news api results for canada', response.articles);
        this.setState({
          newsapi: response.articles
        })
      })
      .catch((error) => {
        console.error(`Error occured on fetch: ${error}`);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Nearby News!</h1>
        </header>
        <section>
          {
            JSON.stringify(this.state.newsapi)
          }
        </section>
      </div>
    );
  }
}

export default App;
