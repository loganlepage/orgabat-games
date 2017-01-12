"use strict";
import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom';
import Boot from './states/Boot';
import Load from './states/Load';
import Play from './states/Play';
import Rules from './states/Rules';
import Win from './states/Win';
import Iframe from 'system/dom/Iframe';

/** State to init the Game canvas */
class Canvas extends Phaser.Game {

    /** Constructor to init the game */
    constructor(width, height, type, node) {
        super(width, height, type, node);

        // Add each game states
        this.state.add('boot', Boot);
        this.state.add('load', Load);
        this.state.add('rules', Rules);
        this.state.add('play', Play);
        this.state.add('win', Win);
    }
    start() {
        this.state.start('boot');
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const game = new Canvas(this.props.width, this.props.height, Phaser.CANVAS, ReactDOM.findDOMNode(this));
        game.start();
        game.iframe = this.refs.iframe;
    }
    render() {
        return <div id="game-canvas">
            <Iframe ref="iframe" />
        </div>;
    }
}