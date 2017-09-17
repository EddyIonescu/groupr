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
        const divStyle = {
            position: 'absolute',
            padding: '200px',
        };

        console.log("Rendered Swiper");
        console.log(this.props.hackerProfiles);

        return (
            <div>
                <div style={divStyle}>
                    <Swing
                        className="stack"
                        tagName="div"
                        setStack={stack => this.setState({ stack })}
                        ref="stack"
                        config={
                            {
                                allowedDirections: [Swing.DIRECTION.LEFT, Swing.DIRECTION.RIGHT]
                            }
                        }
                        throwout={(e) => {
                                console.log('throwout', e);
                                e.target.hidden = true;
                            }
                        }
                    >
                        {this.props.hackerProfiles}
                    </Swing>
                </div>
            </div>
        )
    }
}
