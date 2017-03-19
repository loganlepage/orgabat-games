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
                ? this.game.height / this.game.baseHeight //600 default game height
                : this.game.width / this.game.baseWidth; //800 default game width

        this.game.UI_SCALE =
            (this.game.baseWidth / this.game.baseHeight > this.game.width / this.game.height
                ? this.game.height / 600 //600 default game height
                : this.game.width / 800) * 0.9; //800 default game width

        this.game.uiScale = (n) => MyMath.scale(this.game.UI_SCALE, n);
        this.game.keys = this.game.input.keyboard;

        //Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
        PhaserManager.add('game', this.game);
        this.game.state.start('load');
    }
};