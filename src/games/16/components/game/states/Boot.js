"use strict";
import Phaser from 'phaser';
import BootService from "system/phaser/states/BootService";

/** State to boot the game */
export default class Boot extends Phaser.State {

    /** Called when the state must be created */
    create() {
        BootService.initFitScale(this.game, 1379, 675);
        this.game.state.start('load');
    }
};