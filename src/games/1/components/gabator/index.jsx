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
    start() {
        this.state.start('boot');
    }
}

export default class Gabator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const gabator = new Canvas(this.props.width, this.props.height, Phaser.CANVAS, ReactDOM.findDOMNode(this));
        gabator.start();
    }
    render() {
        return (
            <div id="gabator-canvas">
                <div id="gabator-panel">
                    <div id="gabator-panel-stats">
                        <h4>Statistiques</h4>
                        <ProgressBar name="Santé" class="progress-bar-success"
                                     current={Config.stats.health.default} max={Config.stats.health.max} />
                        <ProgressBar name="Organisation" class="progress-bar-info"
                                     current={Config.stats.organization.default} max={Config.stats.organization.max} />
                        <ProgressBar name="Notoriété de l'entreprise" class="progress-bar-warning"
                                     current={Config.stats.enterprise.default} max={Config.stats.enterprise.max} />
                    </div>
                    <div id="gabator-panel-info">
                        <h4>Informations</h4>
                        <p id="gabator-panel-info-text">{Config.info}</p>
                    </div>
                </div>
            </div>
        );
    }
}