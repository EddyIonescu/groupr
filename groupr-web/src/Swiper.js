import React, { Component } from 'react';
import logo from './logo.svg';
import Swing from 'react-swing';

type Props = {
    hackerProfiles: Array<Object>,
    teamProfiles: Array<Object>,
};

export default class Swiper extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Swing
                className="stack"
                tagName="div"
                setStack={stack => this.setState({ stack })}
                ref="stack"
                throwout={e => console.log('throwout', e)}
            >
                {/*
                    children elements is will be Card
                */}
                <div className="card clubs" ref="card1" throwout={e => console.log('card throwout', e)}>♣</div>
                this.props.hackerProfiles.map(profile => profile.render())
            </Swing>
        )
    }
}
