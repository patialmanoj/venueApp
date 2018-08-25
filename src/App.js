import React, { Component } from 'react';
import logo from './logo.svg';
import LunchPlace from './components/LunchPlace';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Venue For Lunch</h1>
          <p>Search and Vote below to book a place for lunch</p>
        </header>
        <LunchPlace></LunchPlace>
        
      </div>
    );
  }
}

export default App;
