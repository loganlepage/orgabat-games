"use strict";
var Game = Game || {};
Game.State = Game.State || {};

/**
 * State to boot the game
 * @type {{create: Game.State.bootState.create}}
 */
Game.State.bootState = {

    /** Called when the state must be created */
    create: function() {
        Game.game = this.game;
        this.game.state.start('load');
    }
};