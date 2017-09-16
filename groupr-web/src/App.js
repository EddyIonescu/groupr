import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile';
import firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyB0g6P9u0M3k-gO5E3oxjjHlnqRIwK85Nw",
      authDomain: "groupr-9399b.firebaseapp.com",
      databaseURL: "https://groupr-9399b.firebaseio.com",
      projectId: "groupr-9399b",
      storageBucket: "groupr-9399b.appspot.com",
      messagingSenderId: "580456477433"
    };
    firebase.initializeApp(config);
  }

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
          <h2>Welcome to Groupr</h2>
        </div>
        <p className="App-intro">
          To get started, create a profile and get groupin.
        </p>
        <Swiper
          hackerProfiles={sampleData}
        />
      </div>
    );
  }
}

export default App;
