"use strict";
var Game = Game || {};

/**
 * State to init the Game canvas
 * @type {Game}
 */
Game.Canvas = class Canvas extends Phaser.Game {

    /** Constructor to init the game */
    constructor(width, height, type, node) {
        super(width, height, type, node);

        // Add each game states
        this.state.add('boot', Game.State.Boot);
        this.state.add('load', Game.State.Load);
        this.state.add('menu', Game.State.Menu);
        this.state.add('play', Game.State.Play);
        this.state.add('win', Game.State.Win);
    }

    start() {
        this.state.start('boot');
    }
};