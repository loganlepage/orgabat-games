"use strict";
var Gabator = Gabator || {};

/**
 * State to init the Gabator canvas
 * @type {Game}
 */
Gabator.Canvas = class Canvas extends Phaser.Game {

    /** Constructor to init the game */
    constructor(width, height, type, node) {
        super(width, height, type, node);

        // Add each game states
        this.state.add('boot', Gabator.State.Boot);
        this.state.add('load', Gabator.State.Load);
        this.state.add('play', Gabator.State.Play);
    }

    /** Constructor to start the game */
    start() {
        this.state.start('boot');
    }
};