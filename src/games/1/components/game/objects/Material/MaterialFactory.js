'use strict';
import {Group} from 'phaser';
import Material from './Material';

/** Material Group Factory (called by play state) */
export default class MaterialFactory extends Group {

    /**
     * Constructor for a new material group
     * @param game
     * @param layer
     * @param materials
     */
    constructor(game, layer, materials) {
        super(game);
        for(let i in materials) {
            let material = new Material(
                this.game, layer, materials[i].name,
                materials[i].prop, materials[i].x, materials[i].y
            );
            this.add(material.sprite);
        }
    }
};

