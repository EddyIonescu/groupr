import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile';
import firebase from 'firebase';
import TeamCreate from './TeamCreate';
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';

class App extends Component {
  constructor() {
    super();
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

  componentWillMount () {
    var firebaseRef = firebase.database().ref('groupr/groupr-9399b');
    this.bindAsArray(firebaseRef.limitToLast(25), 'items');
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
