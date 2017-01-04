"use strict";
import {Game} from 'phaser';
import Boot from './states/Boot';
import Load from './states/Load';
import Play from './states/Play';

/** Init the Gabator canvas */
export default class Gabator extends Game {

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