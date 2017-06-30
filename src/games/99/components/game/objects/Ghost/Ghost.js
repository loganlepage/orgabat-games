"use strict";

import Config from '../../config/data';
import GhostModalHandler from "./GhostModalHandler";
import BasicGameObject from "system/phaser/BasicGameObject";
import GhostSprite from "./GhostSprite";

/** Ghost Object (include sprite and modals) */
export default class Ghost extends BasicGameObject {

    ready = false;

    /**
     * Constructor for a new Ghost form
     * @param game
     * @param key
     * @param properties
     */
    constructor(game, key, properties) {
        super(game);
        this.addSprite(new GhostSprite(game, 10, 10, this));
        this.key = key;
        this.properties = properties;
        this.addModalHandler(new GhostModalHandler(properties, this, game));
        this.ready = true;
    }
};