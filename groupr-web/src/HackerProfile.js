// @flow
import React, { Component } from 'react';

type Props = {
    name: String,
    header: String,
    bio: String,
};

export default class HackerProfile extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {name, header, bio} = this.props;
        <div>
            <h2>name</h2>
            <h1>header</h1>
            <p>bio</p>
        </div>
    }
}