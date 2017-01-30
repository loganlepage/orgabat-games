"use strict";
import {State} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Config from '../config/data';
import MyMath from 'system/utils/Math';

/** State to boot the game */
export default class Boot extends State {

    /** Called when the state must be created */
    create() {
        this.game.baseWidth = (Config.tilemap.tiles.width * Config.tilemap.tiles.size);
        this.game.baseHeight = (Config.tilemap.tiles.height * Config.tilemap.tiles.size);
        let sWidth = this.game.width / this.game.baseWidth;
        let sHeight = this.game.height / this.game.baseHeight;
        this.game.SCALE = this.game.width > this.game.height ? sWidth : sHeight;
        this.game.uiScale = (n) => MyMath.scale(this.game.SCALE * 0.9, n);
        this.game.keys = this.game.input.keyboard;

        PhaserManager.add('game', this.game);
        this.game.state.start('load');
    }
};