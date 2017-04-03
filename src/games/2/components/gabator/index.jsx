"use strict";
import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom';
import Boot from './states/Boot';
import Load from './states/Load';
import Play from './states/Play';
import ProgressBar from 'system/dom/ProgressBar';
import Config from './config/data';

/** Init the Gabator canvas */
class Canvas extends Phaser.Game {

    /** Constructor to init the game */
    constructor(width, height, type, node) {
        super(width, height, type, node);

        // Add each game states
        this.state.add('boot', Boot);
        this.state.add('load', Load);
        this.state.add('play', Play);
    }

    /** Constructor to start the game */
    start(react) {
        //start(key, clearWorld, clearCache, parameter)
        this.state.start('boot', true, false, react);
    }
}

export default class Gabator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            health: Config.stats.health.default,
            organization: Config.stats.organization.default,
            enterprise: Config.stats.enterprise.default
        };
        this.healthMax = Config.stats.health.max;
        this.organizationMax = Config.stats.organization.max;
        this.enterpriseMax = Config.stats.enterprise.max;
    }
    componentDidMount() {
        const gabator = new Canvas(this.props.width, this.props.height, Phaser.CANVAS,
            ReactDOM.findDOMNode(this), null, false, false);
        gabator.start(this);
    }
    changeValues(stats = {}) {
        this.setState(stats);
    }
    render() {
        const scale = this.props.width / this.props.maxWidth;
        const titleStyle = {
            fontSize: 18 * scale,
            marginBottom: 15 * scale,
            marginTop: 15 * scale
        };
        const defaultStyle = {
            width: this.props.width,
            fontSize: 14 * scale,
            paddingLeft: 15 * scale,
            paddingRight: 15 * scale
        };
        return (
            <div id="gabator-canvas" style={defaultStyle}>
                <div id="gabator-panel">
                    <div id="gabator-panel-stats" style={{paddingBottom:5 * scale}}>
                        <h4 style={titleStyle}>Statistiques</h4>
                        <ProgressBar name="Santé" class="progress-bar-success" scale={scale}
                                     current={this.state.health} max={this.healthMax} />
                        <ProgressBar name="Organisation" class="progress-bar-info" scale={scale}
                                     current={this.state.organization} max={this.organizationMax} />
                        <ProgressBar name="Notoriété de l'entreprise" class="progress-bar-warning" scale={scale}
                                     current={this.state.enterprise} max={this.enterpriseMax} />
                    </div>
                </div>
            </div>
        );
    }
}