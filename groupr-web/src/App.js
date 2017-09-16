import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile'

class App extends Component {
  render() {
    let hack = (
      <HackerProfile
        name="Eddy"
      />
    );
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Swiper
          hackerProfiles={[hack]}
        />
      </div>
    );
  }
}

export default App;
