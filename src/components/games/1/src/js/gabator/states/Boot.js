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
        Gabator.game.stats = new Gabator.ProgressBar(Gabator.Config.data.stats);
        Gabator.game.info = new Gabator.Info(Gabator.Config.data.info);
        this.game.state.start('load');
    }
};