// @flow
import React, { Component } from 'react';

type Props = {
    name: String,
    bio: String,
    picture: String
};

export default class HackerProfile extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const divStyle = {
            background: 'blue',
            position: 'absolute',
        };
        const {name, bio, picture} = this.props;
        return (
            <div style={divStyle}>
                <img src = { picture }/>
                <h2>{ name }</h2>
                <p>{ bio }</p>
            </div>
        );
    }
}

