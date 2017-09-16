import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile'

class App extends Component {
  render() {
    let sampleData = [(
      <HackerProfile
        name="Eddy"
        bio="hello"
        picture="pic"
      />
    ), (
      <HackerProfile
        name="Brian"
        bio="hello"
        picture="pic"
      />
    ),
    (
      <HackerProfile
        name="Cindy"
        bio="hello"
        picture="pic"
      />
    ),
    (
      <HackerProfile
        name="Meehakk"
        bio="hello"
        picture="pic"
      />
    )];
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
          hackerProfiles={sampleData}
        />
      </div>
    );
  }
}

export default App;
