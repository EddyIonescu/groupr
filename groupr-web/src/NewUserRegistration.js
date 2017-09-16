// @flow
import React, { Component } from 'react';
import firebase from 'firebase';

type Props = {
<<<<<<< HEAD
    callback: ()=>void
};

export default class NewUserRegistration extends Component {
=======
    
};

export default class TeamCreate extends Component {
>>>>>>> New User Reg

    props: Props;

    constructor(props) {
        super(props);
        this.state = {
<<<<<<< HEAD
            bio: ''
=======
            bio: '',
>>>>>>> New User Reg
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
<<<<<<< HEAD
                pic: providerData.photoUrl == null ? "" : providerData.photoUrl
             }
            var newUserId = firebase.database().ref().child('users').push().key;
               

            firebase.database().ref('users/'+newUserId).set(newUserData);

            this.props.callback();
=======
                pic: providerData.photoUrl
             }
            var newGroupId = firebase.database.ref().child('groups').push().key;
               

            firebase.database.ref('users/'+newGroupId).set(newTeamData);
>>>>>>> New User Reg
        } else {
            alert("Invalid user");
        }
    }

    render() {
<<<<<<< HEAD
=======
        const {name, description} = this.props;
>>>>>>> New User Reg
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

