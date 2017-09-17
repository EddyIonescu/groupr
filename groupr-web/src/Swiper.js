import React, { Component } from 'react';
import logo from './logo.svg';
import Swing from 'react-swing';

type Props = {
    key: string,
    hackerProfiles: Array<Object>,
    teamProfiles: Array<Object>,
    swipeCallback: boolean => void,
};

export default class Swiper extends Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log('props', this.props);
        const divStyle = {
            position: 'absolute',
            padding: '200px',
            float: 'center',
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
                                console.log('target id', e.target.id);
                                e.target.hidden = true;
                                this.props.swipeCallback(
                                  e.throwDirection === Swing.DIRECTION.RIGHT,
                                  e.target.id,
                                );
                            }
                        }
                    >
                    {this.props.hackerProfiles.map((profile, i) => (
                        <div key={i} id={profile.key}>
                            {profile}
                        </div>)
                    )}
                    </Swing>
                </div>
            </div>
        )
    }
}
