"use strict";
import GameSprite from 'system/phaser/GameSprite';

/** Material Sprite (called by the material gameObject) */
export default class FloorSprite extends GameSprite {

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param key
     * @param obj
     */
    constructor(game, x, y, key, obj) {
        super(game, x, y, `jeu2/house/${key}`, obj);
        window.a_sprite = this;
    }
};