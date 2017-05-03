"use strict";

import BasicGameObject from "system/phaser/BasicGameObject";
import EnemySprite from "./EnemySprite";
import {Signal} from "phaser";

/** Enemy Object (include sprite and modals) */
export default class Enemy extends BasicGameObject {

    ready = false;

    /**
     * Constructor for a new Enemy object
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
        this.addSprite(new EnemySprite(this.game, x, y, type, this));

        this.ready = true;
    }
};