"use strict";
import BasicGameSprite from 'system/phaser/BasicGameSprite';

/** Waste Sprite (called by the material gameObject) */
export default class WasteSprite extends BasicGameSprite {

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param wasteObj
     */
    constructor(game, x, y, wasteObj) {
        super(game, x, y, `jeu3/malle`, wasteObj);
        this.scale.set(0.7);
    }
};