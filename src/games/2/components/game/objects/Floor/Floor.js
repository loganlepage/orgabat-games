"use strict";
import GameObject from "system/phaser/GameObject";
import FloorSprite from "./FloorSprite";

/** Floor Object (include sprite and modals) */
export default class Floor extends GameObject {

    ready = false;

    /**
     * Constructor for a new floor object
     * @param game
     * @param layer
     * @param type
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, type, properties, x, y) {
        super(game, layer);
        this.addSprite(new FloorSprite(game, x, y, type, this));
        this.configure(properties);
        this.type = type;
        this.ready = true;
    }

    /** Config & initialize */
    configure(properties) {
        this.properties = properties;
    }
};