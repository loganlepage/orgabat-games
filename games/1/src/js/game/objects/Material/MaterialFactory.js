'use strict';
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * Material Group Factory (called by play state)
 * @type {MaterialFactory}
 */
Game.Object.MaterialFactory = class MaterialFactory extends Phaser.Group {

    /**
     * Constructor for a new material group
     * @param game
     * @param layer
     * @param materials
     */
    constructor(game, layer, materials) {
        super(game);
        for(let i in materials) {
            console.log(materials[i]);
            let material = new Game.Object.Material(
                this.game, layer, materials[i].name,
                materials[i].prop, materials[i].x, materials[i].y
            );
            this.add(material.sprite);
        }
    }
};

