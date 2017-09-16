import React, { Component } from 'react';
import logo from './logo.svg';
import Swing from 'react-swing';

export default class Swiper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Swing
                className="stack"
                tagName="div"
                setStack={(stack)=> this.setState({stack:stack})}
                ref="stack"
                throwout={(e)=>console.log('throwout',e)}
            >
                {/*
                    children elements is will be Card
                */}
                <div className="card clubs" ref="card1" throwout={(e)=>console.log('card throwout',e)}>♣</div>
                <div className="card diamonds" ref="card2">Brian</div>
                <div className="card hearts" ref="card3">Cindy</div>
                <div className="card spades" ref="card4">Eddy</div>
            </Swing>
        )
    }
}
