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
        console.log(this.props.groupId)
    }

    handlechange = (e) => {
        let newstate = {}
        newstate[e.target.name] = e.target.value;

        this.setState(newstate)
    }

    refresh() {
        var user = firebase.auth().currentUser;
        if (user != null) {
            var uid = user.providerData[0].uid;
            firebase.database().ref().child('groups/'+this.props.groupId)
                .child('reactions')
                .on('value', snapshot => {
                    console.log(this.props.groupId);
                    let individual = snapshot.val();
                    let userid = Object.keys(individual)[0]
                    console.log(individual);
                    if (individual && individual[userid]) {
                        firebase.database()
                            .ref('users')
                            .orderByChild('uid')
                            .equalTo(userid)
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

    render() {
        return(
            <div>
                <Swiper id="profiles" hackerProfiles={this.state.matches}/>
                <input id="refreshButton" type="button" value="Refresh" onClick={this.refresh}/>
            </div>
        );
    }
}

