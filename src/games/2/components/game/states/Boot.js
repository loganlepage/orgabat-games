"use strict";
import Phaser from 'phaser';
import Config from '../config/data';
import BootService from "system/phaser/states/BootService";

/** State to boot the game */
export default class Boot extends Phaser.State {

    /** Called when the state must be created */
    create() {
        BootService.initFillScale(this.game, Config.defaultWidth, Config.defaultHeight);
        this.game.state.start('load');
    }
};