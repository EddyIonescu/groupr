// @flow
import React, { Component } from 'react';
import firebase from 'firebase';
import Swiper from './Swiper';

type Props = {

};

export default class TeamList extends Component {

    props: Props;

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
      const { teams } = props;
      console.log(teams);
    }

    render() {
      return(
        <Swiper
          hackerProfiles={this.props.teams}
        />
      );
    }
}
