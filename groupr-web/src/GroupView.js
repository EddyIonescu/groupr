// @flow
import React, { Component } from 'react';
import firebase from 'firebase';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile';

type Props = {
    groupID: String,
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
            firebase.database().ref().child('groups/'+this.props.groupID)
                .child('reactions')
                .on('value', snapshot => {
                    let individual = snapshot.val();
                    console.log(individual);
                    if (individual && individual.liked) {
                        firebase.database()
                            .ref('users')
                            .orderByChild('uid')
                            .equalTo(individual.userID)
                            .once('value', snapshot => {

                                let user = snapshot.val();
                                let unwrappeduser = user[Object.keys(user)[0]]

                                this.setState({
                                    matches: this.state.matches.concat([
                                    <HackerProfile 
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

    swipeCallback = (liked, groupId) => {
        if (liked) {
            // MATCH
        }
        firebase.database().ref('groups/' + groupId + '/reactions').set({
          [this.state.userId]: liked,
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

