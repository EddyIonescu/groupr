// @flow
import React, { Component } from 'react';

type Props = {
    name: String,
    description: String,
    numhas: Short,
    numrequested: Short
};

export default class TeamProfile extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {name, description} = this.props;
        return(
            <div>
                <h2>{ name }</h2>
                <p>{ description }</p>
                <p> A group of { numhas } looking for { numrequested } </p>
            </div>
        );
    }
}

