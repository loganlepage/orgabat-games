"use strict";
import {State} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';

/** State to boot the game */
export default class Boot extends State {

    /** Called when the state must be created */
    create() {
        PhaserManager.add('game', this.game);
        this.game.state.start('load');
    }
};