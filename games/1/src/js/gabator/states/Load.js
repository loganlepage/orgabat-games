"use strict";
var Gabator = Gabator || {};
Gabator.State = Gabator.State || {};

/**
 * State to load gabator (image, tilemap, spritesheet...)
 * @type {Load}
 */
Gabator.State.Load = class Load extends Phaser.State {

    /** Called before create */
    preload() {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.game.load.image('gabator-sleep', `${game_path}/assets/sprites/gabator-sleep.png`);
        this.game.load.image('gabator', `${game_path}/assets/sprites/gabator.png`);
    }

    /** Called when the state must be created */
    create() {
        this.game.state.start('play');
    }
};