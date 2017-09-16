// @flow
import React, { Component } from 'react';

type Props = {
    name: String,
    header: String,
    bio: String,
};

export default class TeamProfile extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {name, header, description} = this.props;
        <div>
            <h2>name</h2>
            <h1>header</h1>
            <p>description</p>
        </div>
    }
}