import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile'
import {init as firebaseInit} from './firebase'

var firebase = require('firebase');
var firebaseui = require('firebaseui');

class App extends Component {

  constructor() {
    super();
    firebaseInit();

    console.log('in app js');
    // FirebaseUI config.
    var uiConfig = {
      callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl) {
          // Do something.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          console.log(currentUser, credential);
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
      // Query parameter name for mode.
      queryParameterForWidgetMode: 'mode',
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div className="App">
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>

      </div>
    );
  }
}

export default App;
