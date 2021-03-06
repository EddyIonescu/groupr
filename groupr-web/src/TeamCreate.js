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
            teamname: '',
            description: '',
            teamhas: '',
            teamwants: ''
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
        document.createTeamForm.submit();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var user = firebase.auth().currentUser;

        if (user != null) {

            var providerData = user.providerData[0];

            let newTeamData = {
                active: true,
                teamName: this.state.teamname,
                creatorid: providerData.uid,
                numhas: this.state.teamhas,
                numrequested: this.state.teamwants,
                nummatched: 0,
                description: this.state.description
            }

            var newGroupId = firebase.database().ref().child('groups').push().key;

            firebase.database().ref('groups/'+newGroupId).set(newTeamData);
        } else {
            alert("Invalid user");
        }
    }

    render() {
        const {name, description} = this.props;
        return(
            <div className="App">
                <form name="createTeamForm" onSubmit={this.handleSubmit}>
                    <span className="App-intro">Create New Group</span>
                    <br/>
                    <input type="text" style = {{width: 400}} name="teamname" placeholder="Group Name" required
                        value={this.state.teamname} onChange={this.handlechange} /><br/>
                    <textarea name="description" style = {{width: 400}} placeholder="Description" required
                        value={this.state.description} onChange={this.handlechange}></textarea><br/>
                    <input type="number" style = {{width: 400}} name="teamhas" placeholder="Current Members"
                        min="1" max="10" required
                        value={this.state.teamhas} onChange={this.handlechange}/><br/>
                    <input type="number" style = {{width: 400}} name="teamwants" placeholder = "Desired Members"
                        min="1" max="10" required
                        value={this.state.teamwants} onChange={this.handlechange}/><br/>
                    <input type="submit" id="submitButton" className="btn" className="wrapperleft" placeholder="Create Group"/><br/>
                </form>
            </div>
        );
    }
}
