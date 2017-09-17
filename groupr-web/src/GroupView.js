// @flow
import React, { Component } from 'react';
import firebase from 'firebase';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile';

type Props = {
    groupId: String,
};

export default class GroupView extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
        };

        this.handlechange=this.handlechange.bind(this);
        this.refresh=this.refresh.bind(this);

        this.refresh();
        console.log(this.props.groupId)
    }

    handlechange = (e) => {
        let newstate = {}
        newstate[e.target.name] = e.target.value;

        this.setState(newstate)
    }

    refresh() {
        var user = firebase.auth().currentUser;
        if (user) {
            var uid = user.providerData[0].uid;
            firebase.database().ref().child('groups/'+this.props.groupId)
                .child('reactions')
                .on('value', snapshot => {
                    let individual = snapshot.val();

                    if (!individual) {
                      return false;
                    }
                    let userid = Object.keys(individual)[0];
                    if (individual && individual[userid]) {
                        firebase.database()
                            .ref('users')
                            .orderByChild('uid')
                            .equalTo(userid)
                            .once('value', snapshot => {

                                let user = snapshot.val();
                                let unwrappeduser = user[Object.keys(user)[0]];
                                const reactions = unwrappeduser.reactions;

                                if (reactions &&
                                  (reactions[this.props.groupId] === true || reactions[this.props.groupId] === false)) {
                                  return false;
                                }

                                this.setState({
                                    matches: this.state.matches.concat([
                                    <HackerProfile
                                        key={unwrappeduser.uid}
                                        name={unwrappeduser.name}
                                        bio={unwrappeduser.description}
                                        picture={unwrappeduser.pic}/>
                                    ])
                                });
                            });
                   }
                });
        }
    }

    swipeCallback = (liked, userid) => {
      firebase.database()
          .ref('users')
          .orderByChild('uid')
          .equalTo(userid)
          .once('value', snapshot => {
            let user = snapshot.val();
            const userId = Object.keys(user)[0];
            firebase.database().ref('users/' + userId + '/reactions').set({
              [this.props.groupId]: liked,
            });
          });
    }

    render() {
        return(
            <div>
                <Swiper
                    id="profiles"
                    hackerProfiles={this.state.matches}
                    swipeCallback={this.swipeCallback}
                />
                <input id="refreshButton" type="button" value="Refresh" onClick={this.refresh}/>
            </div>
        );
    }
}
