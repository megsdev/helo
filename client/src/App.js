import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Nav from './component/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Nav />
          { routes }
      </div>
    );
  }
}

export default App;
