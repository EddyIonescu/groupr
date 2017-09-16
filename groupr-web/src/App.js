import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile';
import firebase from 'firebase';
import TeamCreate from './TeamCreate';
import ReactFireMixin from 'reactfire';

class App extends ReactFireMixin(Component) {
  constructor() {
    super();
  }

  render() {
    let sampleData = [(
      <HackerProfile
        name="Eddy"
        bio="hello"
        picture="https://upload.wikimedia.org/wikipedia/commons/2/29/Epinephelus_malabaricus.jpg"
      />
    ), (
      <HackerProfile
        name="Brian"
        bio="hello"
        picture="https://upload.wikimedia.org/wikipedia/commons/2/29/Epinephelus_malabaricus.jpg"
      />
    ),
    (
      <HackerProfile
        name="Cindy"
        bio="hello"
        picture="https://upload.wikimedia.org/wikipedia/commons/2/29/Epinephelus_malabaricus.jpg"
      />
    ),
    (
      <HackerProfile
        name="Meehakk"
        bio="hello"
        picture="https://upload.wikimedia.org/wikipedia/commons/2/29/Epinephelus_malabaricus.jpg"
      />
    )];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Groupr</h2>
        </div>
        <p className="App-intro">
          To get started, create a profile and get groupin.
        </p>
        <Swiper
          hackerProfiles={sampleData}
        />
        <TeamCreate />
      </div>
    );
  }
}

export default App;
