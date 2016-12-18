'use strict';
var Game = Game || {};
Game.Group = Game.Group || {};

/**
 * Vehicle Group Factory (called by play state)
 * @type {VehicleGroup}
 */
Game.Group.VehicleGroup = class VehicleGroup extends Phaser.Group {

    /**
     * Constructor for a new vehicle group
     * @param game
     * @param layer
     * @param vehicles
     */
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