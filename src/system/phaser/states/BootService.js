"use strict";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import MyMath from 'system/utils/Math';

/** State to boot the game */
export default class Boot {

    /**
     * @return {number}
     */
    static get DEFAULT_WIDTH() {return 800}; //800px default game width

    /**
     * @return {number}
     */
    static get DEFAULT_HEIGHT() {return 600}; //600px default game height

    /**
     * @return {number}
     */
    static get DEFAULT_UI_SCALE() {return 0.9};

    /** Boot init with content fill in world */
    static initFillScale(game, baseWidth, baseHeight) {
        game.SCALE =
            baseWidth / baseHeight > game.width / game.height
                ? game.height / baseHeight
                : game.width / baseWidth;

        this._init(game, baseWidth, baseHeight);
    }

    /** Boot innit with content fit in world */
    static initFitScale(game, baseWidth, baseHeight) {
        game.SCALE =
            baseWidth / baseHeight > game.width / game.height
                ? game.width / baseWidth
                : game.height / baseHeight;

        this._init(game, baseWidth, baseHeight);
    }

    static _init(game, baseWidth, baseHeight) {
        game.baseWidth = baseWidth;
        game.baseHeight = baseHeight;

        //always the same ui scale for all game scale profile
        game.UI_SCALE =
            (game.baseWidth / game.baseHeight > game.width / game.height
                ? game.height / Boot.DEFAULT_HEIGHT
                : game.width / Boot.DEFAULT_WIDTH) * Boot.DEFAULT_UI_SCALE;

        game.uiScale = (n) => MyMath.scale(game.UI_SCALE, n);
        game.keys = game.input.keyboard;

        //Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        //Phaser.Canvas.setSmoothingEnabled(game.context, false);
        PhaserManager.add('game', game);
    }
};