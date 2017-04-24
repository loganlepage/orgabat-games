"use strict";

import WasteModalHandler from "./WasteModalHandler";
import BasicGameObject from "system/phaser/BasicGameObject";
import WasteSprite from "./WasteSprite";
import {Signal} from "phaser";

/** Waste Object (include sprite and modals) */
export default class Waste extends BasicGameObject {

    ready = false;
    onActionClick = new Signal();


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
        this.type = type;
        this.properties = properties;
        this.addSprite(new WasteSprite(this.game, x, y, type, this));
        this.addModalHandler(new WasteModalHandler(properties, this, game));

        this.modalHandler.onActionClick.add((action, waste) => this.onActionClick.dispatch(action, waste), this);
        this.ready = true;
    }

    onMouseDown() {
        this.modalHandler.showActions();
    }

    onMouseOut() {
        this.onMouseOutHandled.dispatch();
    }
};