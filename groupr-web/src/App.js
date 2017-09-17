import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import TeamCreate from './TeamCreate';
import GroupView from './GroupView';
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
import firebaseui from 'firebaseui';
import NewUserRegistration from './NewUserRegistration';
import TeamList from './TeamList';
import HackerProfile from './HackerProfile';

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
    this.state = {
        needsBio: false,
        groups: [],
        signedIn: false,
    }
  }

  componentWillMount () {
    var firebaseRef = firebase.database().ref('groupr/groupr-9399b');
    this.bindAsArray(firebaseRef.limitToLast(25), 'items');

    // FirebaseUI config.
    var uiConfig = {
      callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl) {
          // Do something.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          this.setState({needsBio: true});
          return false;
        }.bind(this),
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
      // Query parameter name for mode.
      queryParameterForWidgetMode: 'mode',
      // Query parameter name for sign in success url.
      queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
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

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ signedIn: true });

        const userId = user.providerData[0].uid;
        // User is signed in.

        let groups = [];
        firebase.database().ref('groups').on('value', (snapshot) => {
          Object.values(snapshot.val()).forEach((group) => {
            if (group.creatorid !== userId) {
              const {
                teamName,
                description,
                creatorid,
              } = group;

              firebase.database().ref('users').orderByChild('uid')
                .equalTo(creatorid).once('value', (snapshot) => {
                  let groupProfile = (
                    <HackerProfile
                      key={group.key}
                      name={teamName}
                      bio={description}
                      picture={Object.values(snapshot.val())[0].pic}
                    />
                  );
                  groups.push(groupProfile);
                  this.setState({ groups });
                }
              );
            }
          });
        });
      } else {
        // User is signed out.
        console.log('user is signed out');
      }
    });
  }

  render() {
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
        <GroupView groupID="-KuBNBpIyMSTWWLBzREj"/>

        {this.state.signedIn && (<TeamList teams={this.state.groups} />)}

      </div>
    );
  }
}

reactMixin(App.prototype, ReactFireMixin);

export default App;
