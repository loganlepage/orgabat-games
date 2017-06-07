"use strict";
import Phaser from 'phaser';
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Character extends React.Component {

    constructor(props) {
        super(props);
        this.size = this.props.width * 0.7;
    }

    static propTypes = {
        width: PropTypes.number.isRequired
    }

    componentDidMount() {
        const gabator = new this.props.canvas(this.size, this.size, Phaser.CANVAS,
            ReactDOM.findDOMNode(this), null, false, false);
        gabator.start(this.props.parent);
    }

    render() {
        return <div id="gabator-panel-character"></div>;
    }
}


