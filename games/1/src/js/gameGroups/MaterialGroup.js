'use strict';
var Game = Game || {};
Game.Group = Game.Group || {};

/**
 * material group (called by play state)
 */
Game.Group.MaterialGroup = class MaterialGroup extends Phaser.Group {
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

