'use strict';
var Game = Game || {};
Game.Group = Game.Group || {};

/**
 * vehicle group (called by play state)
 */
Game.Group.VehicleGroup = class VehicleGroup extends Phaser.Group {
    constructor(game, layer, vehicles) {
        super(game);
        for(let i in vehicles) {
            let vehicle = new Game.Object.VehicleObj(
                this.game, layer, vehicles[i].name,
                vehicles[i].prop, vehicles[i].x, vehicles[i].y
            );
            this.add(vehicle.sprite);
        }
    }
};