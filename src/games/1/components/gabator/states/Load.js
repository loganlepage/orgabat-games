"use strict";
import {State} from 'phaser';

/** State to load gabator (image, tilemap, spritesheet...) */
export default class Load extends State {

    /** Called before create */
    preload() {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.game.load.image('gabator-sleep', `${assets_path}/sprites/gabator-sleep.png`);
        this.game.load.image('gabator', `${assets_path}/sprites/gabator.png`);
    }

    /** Called when the state must be created */
    create() {
        this.game.state.start('play');
    }
};