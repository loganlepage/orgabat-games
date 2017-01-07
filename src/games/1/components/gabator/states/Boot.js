"use strict";
import {State} from 'phaser';
import Config from '../config/data';
import ProgressBar from 'system/gabator/ProgressBar';
import Info from 'system/gabator/Info';
import PhaserManager from 'system/phaser/utils/PhaserManager';

/** State to boot gabator */
export default class Boot extends State {

    /** Called when the state must be created */
    create() {
        PhaserManager.add('gabator', this.game);
        this.game.stats = new ProgressBar(Config.stats);
        this.game.info = new Info(Config.info);
        this.game.state.start('load');
    }
}