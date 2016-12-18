'use strict';
var Game = Game || {};
Game.Group = Game.Group || {};

/**
 * Material Group Factory (called by play state)
 * @type {MaterialGroup}
 */
Game.Group.MaterialGroup = class MaterialGroup extends Phaser.Group {

    /**
     * Constructor for a new material group
     * @param game
     * @param layer
     * @param materials
     */
    constructor(game, layer, materials) {
        super(game);
        for(let i in materials) {
            let material = new Game.Object.MaterialObj(
                this.game, layer, materials[i].name,
                materials[i].prop, materials[i].x, materials[i].y
            );
            this.add(material.sprite);
        }
    }
};

