"use strict";
var Gabator = Gabator || {};
Gabator.State = Gabator.State || {};

/**
 * State when we start gabator
 * @type {{create: Gabator.State.playState.create, awakeGabator: Gabator.State.playState.awakeGabator}}
 */
Gabator.State.playState = {

    /** Called when the state must be created */
    create: function() {
        this.gabator = this.game.add.sprite(0, 0, 'gabator-sleep');
        this.gabator.x = this.game.canvas.width / 2 - this.gabator.width / 2;
        this.gabator.y = this.game.canvas.height - this.gabator.height;
    },

    /** Called when the game start */
    awakeGabator: function() {
        this.gabator.loadTexture('gabator', 0);
    }
};