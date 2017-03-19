'use strict';

import {Signal} from 'phaser';

/** Abstract Object */
export default class AbstractObject {

    onMouseOutHandled = new Signal();

    constructor(game) {
        this.game = game;
    }
    addModalHandler(modalHandler) {
        this.modalHandler = modalHandler;
    }
}