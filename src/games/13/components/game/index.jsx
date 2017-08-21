"use strict";
import Phaser from 'phaser';
import React from 'react';
import ReactDOM from 'react-dom';
import Boot from './states/Boot';
import Load from './states/Load';
import Play from './states/Play';
import Rules from './states/Rules';
import Type from 'system/utils/Type';

/** State to init the Game canvas */
export class Canvas extends Phaser.Game {

    /** Constructor to init the game */
    constructor(width, height, type, node) {
        super(width, height, type, node);

        // Add each game states
        this.state.add('boot', Boot);
        this.state.add('load', Load);
        this.state.add('rules', Rules);
        this.state.add('play', Play);
    }
    start() {
        this.state.start('boot');
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        Game.game = Game.game || null;
    }
    // On créé et lance le jeu s'il n'existe pas,
    // ou on le restore dans son état d'origine s'il existait déjà
    bootGame() {
        if(!Type.isInstanceOf(Game.game, Canvas)) {
            //http://phaser.io/docs/2.6.2/Phaser.Game.html
            Game.game = new Canvas(this.props.width, this.props.height, Phaser.CANVAS,
                ReactDOM.findDOMNode(this), null, false, false);
            Game.game.start();
        } else {
            ReactDOM.findDOMNode(this).appendChild(Game.game.canvas);
        }
    }
    render() {
        return <div id="game-canvas"></div>;
    }
}