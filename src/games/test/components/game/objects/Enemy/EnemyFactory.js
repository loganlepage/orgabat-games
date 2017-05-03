'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Enemy from './Enemy';

/** Waste Group Factory (called by play state) */
export default class EnemyFactory extends GameFactory {

    /**
     * Constructor for a new material group
     * @param game
     * @param enemies
     */
    constructor(game, enemies) {
        super(game);
        for(let i in enemies) {
            this.add((new Enemy(
                this.game, enemies[i].name,
                enemies[i].prop, enemies[i].x, enemies[i].y
            )).sprite);
        }
    }
};

