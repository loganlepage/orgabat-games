"use strict";
import BasicGameSprite from 'system/phaser/BasicGameSprite';

/** Waste Sprite (called by the material gameObject) */
export default class WasteSprite extends BasicGameSprite {

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param key
     * @param wasteObj
     */
    constructor(game, x, y, key, wasteObj) {
        super(game, x, y, `jeu3/dechets/${key}`, wasteObj);
        this.scale.set(this.game.SCALE / (this.game.world.width/400));
    }
};