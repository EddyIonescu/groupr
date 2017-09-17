import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import TeamCreate from './TeamCreate';
import GroupPage from './GroupPage';
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
import firebaseui from 'firebaseui';
import NewUserRegistration from './NewUserRegistration';
import HackerProfile from './HackerProfile';
import Swiper from './Swiper';

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
        userId: '',
        groupMode: false,
    }

    this.toggleMode=this.toggleMode.bind(this);
  }

  toggleMode() {
    this.setState({
        groupMode: !this.state.groupMode
        });
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
           if (currentUser != null) {
               var uid = currentUser.providerData[0].uid;
               firebase.database()
                .ref().child('users')
                .orderByChild("uid")
                .equalTo(uid)
                .once('value', function(snapshot) {
                    const data = snapshot.val();
                    console.log(data);
                    if (data == null)
                        this.setState({needsBio: true});
                    }.bind(this));
                }

          return false;
        }.bind(this),
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
        console.log("SIGNED IN")

        const userId = user.providerData[0].uid;
        this.setState({ userId });
        // User is signed in.

        firebase.database().ref().child('users').orderByChild('uid')
          .equalTo(userId).once('value', snapshot => {
            const reactions = Object.values(snapshot.val())[0].reactions;
            if (!reactions) {
              return false;
            }
            let match = null;

            Object.keys(reactions).forEach((key) => {
              if (match || !reactions[key]) {
                return false;
              }
              match = key;
            });
            if (match) {
              firebase.database().ref('groups/' + match)
                .once('value', snapshot => {
                  const {
                    creatorid,
                    teamName,
                  } = snapshot.val();
                  alert('Congratulations! You\'ve been matched with group '
                    + teamName + '!');
                });
            }
          });

        let groups = [];
        firebase.database().ref('groups').on('value', (snapshot) => {
          Object.keys(snapshot.val()).forEach((key) => {
            const group = snapshot.val()[key];
            if (group.creatorid !== userId) {
              const {
                teamName,
                description,
                creatorid,
                reactions,
              } = group;

              if (reactions &&
                (reactions[userId] === true || reactions[userId] === false)) {
                return false;
              }

              firebase.database().ref('users').orderByChild('uid')
                .equalTo(creatorid).once('value', (snapshot, i) => {
                  let groupProfile = (
                    <HackerProfile
                      key={key}
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
          this.refs.groupPage.onAuthComplete();
        });
      } else {
        // User is signed out.
        console.log('user is signed out');
      }
    });
  }

  swipeCallback = (liked, groupId) => {
    firebase.database().ref('groups/' + groupId + '/reactions').set({
      [this.state.userId]: liked,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header jumbotron my-blue-class">
          <span className="navbar-brand">Groupr. </span>
          <span className="resizing">Creating pending connections. </span>
        </div>
        <p className="App-intro">
          Create a profile to complete your group.
        </p>

        <input type="button" id="toggle" value="Toggle Group/Individual Mode" onClick={this.toggleMode}/>
        {!this.state.signedIn && <div id="firebaseui-auth-container"></div>}

        {this.state.needsBio && <NewUserRegistration callback={() =>
            {
               this.setState({needsBio: false});
            }}
            />
        }

        <GroupPage visibility={this.state.signedIn && !this.state.needsBio && this.state.groupMode} ref="groupPage"/>

        {this.state.signedIn && !this.state.needsBio && !this.state.groupMode &&
        (<Swiper
          hackerProfiles={this.state.groups}
          swipeCallback={this.swipeCallback}
        />)}

      </div>
    );
  }
}

reactMixin(App.prototype, ReactFireMixin);

export default App;
