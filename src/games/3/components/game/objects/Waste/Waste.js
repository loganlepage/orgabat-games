"use strict";

import {Signal} from 'phaser';
import Config from '../../config/data';
import WasteModalHandler from "./WasteModalHandler";
import BasicGameObject from "system/phaser/BasicGameObject";
import WasteSprite from "./WasteSprite";

/** Waste Object (include sprite and modals) */
export default class Waste extends BasicGameObject {

    ready = false;

    /**
     * Constructor for a new Waste object
     * @param game
     * @param type
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, type, properties, x, y) {
        super(game);
        this.addSprite(new WasteSprite(this.game, x, y, type, this));
        this.addModalHandler(new WasteModalHandler(properties, this, game));
        this.ready = true;
        this.type = type;
    }

    onMouseDown() {
        this.modalHandler.showActions();
    }
    onMouseOut() {
        this.onMouseOutHandled.dispatch();
    }
};