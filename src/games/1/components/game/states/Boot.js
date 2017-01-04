"use strict";
import {State} from 'phaser';
import CanvasCollection from 'system/phaser/utils/CanvasCollection';

/** State to boot the game */
export default class Boot extends State {

    /** Called when the state must be created */
    create() {
        CanvasCollection.addCanvas('game', this.game);
        this.game.state.start('load');
    }
};