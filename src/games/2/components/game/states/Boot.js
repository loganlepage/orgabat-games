"use strict";
import Phaser from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Config from '../config/data';
import MyMath from 'system/utils/Math';

/** State to boot the game */
export default class Boot extends Phaser.State {

    /** Called when the state must be created */
    create() {
        this.game.baseWidth = Config.defaultWidth;
        this.game.baseHeight = Config.defaultHeight;
        this.game.SCALE =
             this.game.baseWidth / this.game.baseHeight > this.game.width / this.game.height
             ? this.game.height / this.game.baseHeight
             : this.game.width / this.game.baseWidth;
        this.game.uiScale = (n) => MyMath.scale(this.game.SCALE * 0.9, n);
        this.game.keys = this.game.input.keyboard;

        //Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
        PhaserManager.add('game', this.game);
        this.game.state.start('load');
    }
};