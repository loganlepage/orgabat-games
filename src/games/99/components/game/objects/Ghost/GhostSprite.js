"use strict";
import BasicGameSprite from "system/phaser/BasicGameSprite";

/** Player Sprite (called by the character gameObject) */
export default class GhostSprite extends BasicGameSprite {

    /**
     * Constructor for a new character sprite
     * @param game
     * @param x
     * @param y
     * @param obj
     */
    constructor(game, x, y, obj) {
        super(game, x, y, `jeu3/epi/anti_chute`, obj);
    }
};