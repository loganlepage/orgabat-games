"use strict";
var Game = Game || {};
Game.State = Game.State || {};

/**
 * State to boot the game
 * @type {Boot}
 */
Game.State.Boot = class Boot extends Phaser.State {

    /** Called when the state must be created */
    create() {
        Game.game = this.game;
        this.game.state.start('load');
    }
};