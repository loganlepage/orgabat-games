"use strict";
import Phaser from 'phaser';
import Config from '../config/data';
import BootService from "system/phaser/states/BootService";

/** State to boot the game */
export default class Boot extends Phaser.State {

    /** Called when the state must be created */
    create() {
        BootService.initFillScale(
            this.game,
            Config.tilemap.tiles.width * Config.tilemap.tiles.size,
            Config.tilemap.tiles.height * Config.tilemap.tiles.size
        );
        this.game.state.start('load');
    }
};


