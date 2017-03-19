'use strict';
import GameFactory from 'system/phaser/GameFactory';
import Material from './Material';

/** material Group Factory (called by play state) */
export default class MaterialFactory {

    /**
     * Constructor for a new material group
     * @param game
     * @param materials
     */
    constructor(game, materials) {
        for(let i in materials) {
            new Material(game, materials[i].name, materials[i].prop);
        }
    }
};

