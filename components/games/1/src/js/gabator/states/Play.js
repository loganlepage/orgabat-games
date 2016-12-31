"use strict";
var Gabator = Gabator || {};
Gabator.State = Gabator.State || {};

/**
 * State when we start gabator
 * @type {Play}
 */
Gabator.State.Play = class Play extends Phaser.State {

    /** Called when the state must be created */
    create() {
        this.gabator = this.game.add.sprite(0, 0, 'gabator-sleep');
        this.gabator.x = this.game.canvas.width / 2 - this.gabator.width / 2;
        this.gabator.y = this.game.canvas.height - this.gabator.height;
    }

    /** Called when the game start */
    awakeGabator() {
        this.gabator.loadTexture('gabator', 0);
    }
};