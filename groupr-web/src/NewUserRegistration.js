// @flow
import React, { Component } from 'react';
import firebase from 'firebase';

type Props = {
    
};

export default class TeamCreate extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {
            bio: '',
        };

        this.handlechange=this.handlechange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handlechange = (e) => {
        let newstate = {}
        newstate[e.target.name] = e.target.value;

        this.setState(newstate)
    }

    submit() {
        document.newUserRegForm.submit();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var user = firebase.auth().currentUser;

        if (user != null) {
            var providerData = user.providerData[0];

            let newUserData = {
                uid: providerData.uid,
                name: providerData.displayName,
                description: this.state.bio,
                pic: providerData.photoUrl
             }
            var newGroupId = firebase.database.ref().child('groups').push().key;
               

            firebase.database.ref('users/'+newGroupId).set(newTeamData);
        } else {
            alert("Invalid user");
        }
    }

    render() {
        const {name, description} = this.props;
        return(
            <div>
                <form name="newUserRegForm" onSubmit={this.handleSubmit}>
                    <h2> New User Setup </h2>
                    <textarea name="bio" placeholder="Biography" required 
                        value={this.state.description} onChange={this.handlechange}></textarea><br/>
                    <input type="submit" id="submitButton" className="btn" placeholder="Submit Bio"/><br/>
                </form>
            </div>
        );
    }
}

