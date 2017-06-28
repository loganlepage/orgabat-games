"use strict";
import {State} from 'phaser';
import Config from '../config/data';

/** State to load gabator (image, tilemap, spritesheet...) */
export default class Load extends State {

    /** Called before create */
    preload() {
        this.game.stage.backgroundColor = "#FFFFFF";
        this.game.load.atlasJSONHash('atlas', `${assets_path}${Config.atlas}.png`, `${assets_path}${Config.atlas}.json`);
    }

    /** Called when the state must be created */
    create() {
        this.game.state.start('play');
    }
};