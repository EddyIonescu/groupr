// @flow
import React, { Component } from 'react';
import firebase from 'firebase';
import Swiper from './Swiper';
import HackerProfile from './HackerProfile';
import GroupView from "./GroupView";
import TeamCreate from "./TeamCreate";

type Props = {
    visibility: Boolean,
};

export default class GroupPage extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {
            groupMade: false,
            groupId: ''
        };
    }

    onAuthComplete() {
        var user = firebase.auth().currentUser;
        if (user != null) {
            var uid = user.providerData[0].uid;
            firebase.database()
                    .ref('groups')
                    .orderByChild('creatorid')
                    .equalTo(uid)
                    .once('value', snapshot => {
                        var group = snapshot.val()
                        console.log(group);

                        if (group == null) {
                            this.setState(
                                { 
                                    groupMade: false 
                                });

                        } else {
                            this.setState(
                                { groupMade: true,
                                  groupId: Object.keys(group)[0]
                                });
                            console.log("GROUP ID:" + Object.keys(group)[0])
                            console.log("GROUP" + group)
                            console.log(this.state.groupId)
                        }
                    });
        }

    }

    render() {
        return(
                <div>
            {this.props.visibility && 
                <div>
                    {this.state.groupMade && (<GroupView groupId = {this.state.groupId}/>)}
                    {!this.state.groupMade && (<TeamCreate />)}
                </div>
                    }
                </div>
        );
    }
}

