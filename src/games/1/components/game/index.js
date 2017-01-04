"use strict";
import Phaser from 'phaser';
import Boot from './states/Boot';
import Load from './states/Load';
import Menu from './states/Menu';
import Play from './states/Play';
import Win from './states/Win';

/** State to init the Game canvas */
export default class Game extends Phaser.Game {

    /** Constructor to init the game */
    constructor(width, height, type, node) {
        super(width, height, type, node);

        // Add each game states
        this.state.add('boot', Boot);
        this.state.add('load', Load);
        this.state.add('menu', Menu);
        this.state.add('play', Play);
        this.state.add('win', Win);
    }

    start() {
        this.state.start('boot');
    }
}