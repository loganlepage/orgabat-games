"use strict";
import {State} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import MyMath from 'system/utils/Math';

/** State to boot gabator */
export default class Boot extends State {

    init(dom) {
        this.game.stats = dom;
    }

    /** Called when the state must be created */
    create() {
        PhaserManager.add('gabator', this.game);

        this.game.baseWidth = 250;
        let sWidth = this.game.width / this.game.baseWidth;
        let sHeight = this.game.height / this.game.baseWidth;
        this.game.SCALE = this.game.width > this.game.height ? sHeight : sWidth;
        this.game.uiScale = (n) => MyMath.scale(this.game.SCALE * 0.9, n);
        this.game.state.start('load');
    }
}