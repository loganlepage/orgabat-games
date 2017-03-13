"use strict";
import {Signal} from 'phaser'
import GameObject from 'system/phaser/GameObject';
import FloorSprite from './FloorSprite';
import Position from 'system/phaser/utils/Position';


/** Floor Object (include sprite and modals) */
export default class Floor extends GameObject {

    ready = false;

    /**
     * Constructor for a new floor object
     * @param game
     * @param name
     * @param properties
     * @param x
     * @param y
     */
    constructor(game, layer, name, properties, x, y) {
        super(game, layer);
        this.addSprite(new FloorSprite(game, x, y, name, this));
        this.configure(properties);
        this.type = name;
        this.ready = true;
    }

    /** Config & initialize */
    configure(properties) {
        this.properties = properties;
    }
};