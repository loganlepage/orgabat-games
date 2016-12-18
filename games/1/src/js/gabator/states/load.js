"use strict";
var Gabator = Gabator || {};
Gabator.State = Gabator.State || {};

/**
 * State to load gabator (image, tilemap, spritesheet...)
 * @type {{preload: Gabator.State.loadState.preload, create: Gabator.State.loadState.create}}
 */
Gabator.State.loadState = {

    /** Called before create */
    preload: function() {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.game.load.image('gabator-sleep', `${game_path}/assets/sprites/gabator-sleep.png`);
        this.game.load.image('gabator', `${game_path}/assets/sprites/gabator.png`);
    },

    /** Called when the state must be created */
    create: function() {
        this.game.state.start('play');
    }
};