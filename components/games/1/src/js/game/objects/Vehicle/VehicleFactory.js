'use strict';
var Game = Game || {};
Game.Object = Game.Object || {};

/**
 * Vehicle Group Factory (called by play state)
 * @type {VehicleFactory}
 */
Game.Object.VehicleFactory = class VehicleFactory extends Phaser.Group {

    /**
     * Constructor for a new vehicle group
     * @param game
     * @param layer
     * @param vehicles
     */
    constructor(game, layer, vehicles) {
        super(game);
        for(let i in vehicles) {
            let vehicle = new Game.Object.Vehicle(
                this.game, layer, vehicles[i].name,
                vehicles[i].prop, vehicles[i].x, vehicles[i].y
            );
            this.add(vehicle.sprite);
        }
    }
};