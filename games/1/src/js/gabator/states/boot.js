"use strict";
var Gabator = Gabator || {};
Gabator.State = Gabator.State || {};

/**
 * State to boot gabator
 * @type {{create: Gabator.State.bootState.create}}
 */
Gabator.State.bootState = {

    /** Called when the state must be created */
    create: function() {
        Gabator.game = this.game;
        this.game.state.start('load');
    }
};