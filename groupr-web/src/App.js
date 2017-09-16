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

        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
        <div id="createbio"/>

        <TeamCreate />
        {this.state.needsBio && <NewUserRegistration callback={() =>
            {
                console.log("not a genius");
               this.setState({needsBio: false});
            }}
            />
        }

        <Swiper
          hackerProfiles={sampleData}
        />

      </div>
    );
  }
}

reactMixin(App.prototype, ReactFireMixin);

export default App;
