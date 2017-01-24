"use strict";
import {State} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Keys from 'system/phaser/utils/Keys';
import Config from '../config/data';
import MyMath from 'system/utils/Math';
import Type from 'system/utils/Type';

/** State to boot the game */
export default class Boot extends State {

    /** Called when the state must be created */
    create() {
        PhaserManager.add('game', this.game);

        this.game.baseWidth = (Config.tilesmap.tiles.width * Config.tilesmap.tiles.size);
        this.game.baseHeight = (Config.tilesmap.tiles.height * Config.tilesmap.tiles.size);
        let sWidth = this.game.width / this.game.baseWidth;
        let sHeight = this.game.height / this.game.baseHeight;
        this.game.SCALE = ( this.game.baseHeight * sWidth > this.game.height ) ? sWidth : sHeight;
        this.game.uiScale = (n) => MyMath.scale(this.game.SCALE * 0.9, n);

        this.game.keys = new Keys(this.game);
        this.game.state.start('load');
    }
};