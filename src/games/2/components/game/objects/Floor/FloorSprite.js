"use strict";
import Config from '../../config/data';
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
    constructor(game, x, y, name, obj) {
        super(game, x, y, `jeu2/house/${name}`, obj);
    }
};