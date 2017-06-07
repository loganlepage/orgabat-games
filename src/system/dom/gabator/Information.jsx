"use strict";
import React from "react";
import PropTypes from "prop-types";

export default class Statistique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.info
        };
    }

    static propTypes = {
        info: PropTypes.string.isRequired,
        scale: PropTypes.number.isRequired
    }

    render() {
        const titleStyle = {
            fontSize: 18 * this.props.scale,
            marginBottom: 15 * this.props.scale,
            marginTop: 15 * this.props.scale
        };
        const paddingStyle = {
            paddingLeft: 15 * this.props.scale,
            paddingRight: 15 * this.props.scale,
            paddingBottom: 5 * this.props.scale
        };
        return (
            <div id="gabator-panel-info" style={paddingStyle}>
                <h4 style={titleStyle}>Informations</h4>
                <p id="gabator-panel-info-text">{this.state.info}</p>
            </div>
        );
    }
}