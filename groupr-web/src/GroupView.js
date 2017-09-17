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
        console.log("In Refresh");
        var user = firebase.auth().currentUser;
        if (user != null) {
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

                                console.log(unwrappeduser.name);
                                console.log(unwrappeduser.pic);
                                console.log(unwrappeduser.description);

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
