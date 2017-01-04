"use strict";
import {State} from 'phaser';
import Config from '../config/data';
import ProgressBar from 'system/gabator/ProgressBar';
import Info from 'system/gabator/Info';
import CanvasCollection from 'system/phaser/utils/CanvasCollection';

/** State to boot gabator */
export default class Boot extends State {

    /** Called when the state must be created */
    create() {
        CanvasCollection.addCanvas('gabator', this.game);
        this.game.stats = new ProgressBar(Config.stats);
        this.game.info = new Info(Config.info);
        this.game.state.start('load');
    }
}