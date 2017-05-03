"use strict";
import BasicGameSprite from 'system/phaser/BasicGameSprite';

/** Enemy Sprite (called by the enemy gameObject) */
export default class EnemySprite extends BasicGameSprite {

    /**
     * Constructor for a new material sprite
     * @param game
     * @param x
     * @param y
     * @param key
     * @param enemyObj
     */
    constructor(game, x, y, key, enemyObj) {
        super(game, game.SCALE * x, game.SCALE * y, `test/${key}`, enemyObj);
    }
};