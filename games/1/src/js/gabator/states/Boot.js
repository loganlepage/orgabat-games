"use strict";
var Gabator = Gabator || {};
Gabator.State = Gabator.State || {};

/**
 * State to boot gabator
 * @type {Boot}
 */
Gabator.State.Boot = class Boot extends Phaser.State {

    /** Called when the state must be created */
    create() {
        Gabator.game = this.game;
        this.game.state.start('load');
    }
};