'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Material from './Material';

/** Material Group Factory (called by play state) */
export default class MaterialFactory extends GameFactory {

    /**
     * Constructor for a new material group
     * @param game
     * @param layer
     * @param materials
     */
    constructor(game, layer, materials) {
        super(game);
        for(let i in materials) {
            this.add((new Material(
                this.game, layer, materials[i].name,
                materials[i].prop, materials[i].x, materials[i].y
            )).sprite);
        }
    }
};

