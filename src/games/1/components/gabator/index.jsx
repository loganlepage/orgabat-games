"use strict";
import React from "react";
import Statistics from "system/dom/gabator/Statistics";
import Information from "system/dom/gabator/Information";
import Quests from "system/dom/gabator/Quests";
import Character from "system/dom/gabator/Character";
import Config from "./config/data";
import Boot from "./states/Boot";
import Load from "./states/Load";
import Play from "./states/Play";
import Flexbox from "flexbox-react";
import PropTypes from "prop-types";

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
        this.scale = this.props.width / this.props.maxWidth;
    }

    static propTypes = {
        width: PropTypes.number.isRequired,
        maxWidth: PropTypes.number.isRequired
    }

    render() {
        const defaultStyle = {
            width: this.props.width,
            fontSize: 14 * this.scale
        };
        return (
            <div id="gabator-canvas" style={defaultStyle}>
                <Flexbox flexDirection="column" height="100vh" id="gabator-panel">
                    <Flexbox className="gabator-module">
                        <Statistics stats={Config.stats} scale={this.scale} ref="stats"/>
                    </Flexbox>
                    <Flexbox className="gabator-module">
                        <Information info={Config.info} scale={this.scale} ref="info"/>
                    </Flexbox>
                    <Flexbox className="gabator-module" flexGrow={1} style={{overflowY: 'auto'}}>
                        <Quests scale={this.scale} ref="quests"/>
                    </Flexbox>
                    <Flexbox className="gabator-module">
                        <Character canvas={Canvas} width={this.props.width} parent={this}/>
                    </Flexbox>
                </Flexbox>
            </div>
        );
    }
}