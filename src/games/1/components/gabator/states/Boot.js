"use strict";
import {State} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';

/** State to boot gabator */
export default class Boot extends State {

    init(dom) {
        this.game.reactDom = dom;
    }

    /** Called when the state must be created */
    create() {
        PhaserManager.add('gabator', this.game);
        this.game.state.start('load');
    }
}